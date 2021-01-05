from rest_framework import permissions, generics, filters
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.models import User
from django.db.models import Count
from text_trader.permissions import IsOwnerOrReadOnly, IsOwner, IsAssociatedWithMessage
from text_trader import models
from text_trader import serializers

import datetime


class BookViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['isbn', 'title', 'authors__first_name',
                     'authors__last_name', 'course__title']

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            serializer.save()
        else:
            serializer.save(creator=self.request.user)

    @action(methods=['get'], detail=False, url_path='search')
    def search(self, request, **kwargs):
        queryset = self.get_queryset()
        queryset = filters.SearchFilter().filter_queryset(request, queryset, self)
        serializer = self.get_serializer(many=True, instance=queryset)
        # BSS = serializers.BookSearchSerializer
        return Response(serializer.data)


class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer


class CustomerViewSet(viewsets.GenericViewSet):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    def create(self, request):
        # request should include locality, user info, customer
        try:
            l = serializers.LocalitySerializer(
                data=request.data.pop('locality'))
            u = serializers.UserSerializer(data=request.data.pop('user'))
        except KeyError as err:
            console.log(err)
            return Response(data={detail: "bad data"}, status=status.HTTP_400_BAD_REQUEST)
        cust = serializers.CustomerSerializer(data=request.data)

        if not l.is_valid():
            return Response({'detail': l.errors}, status=status.HTTP_400_BAD_REQUEST)
        elif not u.is_valid():
            return Response({'detail': u.errors}, status=status.HTTP_400_BAD_REQUEST)
        elif not cust.is_valid():
            return Response({'detail': cust.errors}, status=status.HTTP_400_BAD_REQUEST)

        locality = l.save()
        user = u.save()
        cust.save(locality=locality, user=user)

        return Response(cust.data)

    @action(detail=False, methods=['get'],
            url_path='get-with-token', permission_classes=[permissions.IsAuthenticated])
    def get_with_token(self, request):
        customer = models.Customer.objects.get(user=request.user)
        serializer = serializers.CustomerInfoSerializer(customer)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='verify-user')
    def verify_user(self, request, **kwargs):
        # simply return success or error
        if (request.user.pk == int(kwargs['pk'])):
            return Response({'success': 'User validated succesfully'})
        else:
            return Response({'detail': 'Invalid token for this user'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def listings(self, request, **kwargs):
        # used to get the listings posted by a specific customer.
        customer = self.get_object()
        user_listings = models.Listing.objects.filter(owner=customer)
        serializer = serializers.ListingSerializer(
            many=True, instance=user_listings)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def requests(self, request, **kwargs):
        # used to get the listings posted by a specific customer.
        customer = self.get_object()
        user_requests = models.ListingRequest.objects.filter(owner=customer)
        serializer = serializers.ListingRequestSerializer(
            many=True, instance=user_requests)
        return Response(serializer.data)


class CustomAuthToken(ObtainAuthToken):
    # Used to retrieve an auth token with a username and password
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
        })


class ListingViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def get_queryset(self):
        userId = self.request.query_params.get('userId', "undefined")
        if userId == "undefined":
            return models.Listing.objects.all()
        else:
            return models.Listing.objects.filter(owner__pk=userId)

    def create(self, request, *args, **kwargs):
        # check for customer
        try:
            customer = models.Customer.objects.get(user=request.user)
        except models.Customer.DoesNotExist:
            return Response({"detail": "User has no customer attribute"}, status=status.HTTP_400_BAD_REQUEST)

        override_status = request.data.pop('override', 'False')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data
        if override_status == 'False':
            listing_matches = models.Listing.objects.filter(
                book=d['book'], owner=customer)
            if len(listing_matches) > 0:
                # don't save, just respond
                return Response({"detail": "A partial match to this listing exists"}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer, customer)

        return Response(serializer.data)

    @action(methods=['get'], permission_classes=[IsOwner], detail=True)
    def requests(self, request, **kwargs):
        requests = models.ListingRequest.objects.filter(
            listing=self.get_object())
        serializer = serializers.ListingRequestSerializer(
            many=True, instance=requests)
        return Response(serializer.data)

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ListingRequestList(generics.ListCreateAPIView):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    def get_queryset(self):
        # Can only view requests on your listings or your own requests
        listingId = self.request.query_params.get('listingId', "undefined")

        base_set = models.ListingRequest.objects.all()

        if listingId != "undefined":
            # filter for requests where you own the listing
            base_set = base_set.filter(listing__owner__pk=self.request.user.pk)
            # then filter for the specific listing
            base_set = base_set.filter(listing__pk=listingId)

        else:
            base_set = base_set.filter(owner__pk=self.request.user.pk)

        return base_set

    def create(self, request, *args, **kwargs):
        cust = request.user.customer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data
        listing = models.Listing.objects.get(pk=d['listing'].pk)
        if (cust.pk == listing.owner.pk):
            return Response({"detail": "Cannot create a request for one's own listing"}, status=status.HTTP_400_BAD_REQUEST)

        elif (len(models.ListingRequest.objects.filter(owner=cust, listing=d['listing']))):
            return Response({"detail":
                             "You have already made a request for this listing."
                             + " Please edit your old request or delete it before adding a new one."
                             }, status=status.HTTP_400_BAD_REQUEST)

        else:
            self.perform_create(serializer, cust)
            return Response(serializer.data)

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticated]


class RequestViewSet(viewsets.GenericViewSet):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(owner__pk=request.user.pk)
        serializer = self.get_serializer(many=True, instance=queryset)
        return Response(data=serializer.data)

    def create(self, request, *args, **kwargs):
        cust = request.user.customer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data
        listing = models.Listing.objects.get(pk=d['listing'].pk)
        if (cust.pk == listing.owner.pk):
            return Response({"detail": "Cannot create a request for one's own listing"}, status=status.HTTP_400_BAD_REQUEST)

        elif (len(models.ListingRequest.objects.filter(owner=cust, listing=d['listing']))):
            return Response({"detail":
                             "You have already made a request for this listing."
                             + " Please edit your old request or delete it before adding a new one."
                             }, status=status.HTTP_400_BAD_REQUEST)

        else:
            self.perform_create(serializer, cust)
            return Response(serializer.data)

    @action(methods=['get', 'post'], detail=True, permission_classes=[IsAssociatedWithMessage])
    def messages(self, request, **kwargs):
        if (request.method == 'GET'):
            messages = models.RequestMessage.objects.filter(
                request=self.get_object())
            print(messages)
            serializer = serializers.MessageSerializer(
                many=True, instance=messages)
            return Response(data=serializer.data)

        elif (request.method == 'POST'):
            data = request.data
            data['request'] = self.get_object().pk
            serializer = serializers.MessageSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save(owner=request.user.customer)
            return Response(data=serializer.data)

        return Response()

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticated]


class RequestMessageViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    # either have to own the request or own the request's listing
    def get_queryset(self):
        request_pk = self.request.query_params.get('requestId', None)

        if request_pk:
            request = models.ListingRequest.objects.get(pk=request_pk)
            u_pk = self.request.user.pk

            if request.owner.pk == u_pk or request.listing.owner.pk == u_pk:
                return models.RequestMessage.filter(request__pk=request)

        return None

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        listing_request_pk = serializer.validated_data.request
        listing_request = models.ListingRequest.objects.get(
            pk=listing_request_pk)

        if listing_request.owner.pk == request.user.pk:
            self.perform_create(serializer, False)
            return Response(serializer.data)

        elif listing_request.listing.owner.pk == request.user.pk:
            self.perform_create(serializer, True)
            return Response(serializer.data)

        else:
            return Response({"detail": "You can't post a message on this request"})

    def perform_create(self, serializer, is_seller):
        serializer.save(is_seller=is_seller, owner=self.request.user.customer)


class SchoolViewSet(viewsets.GenericViewSet):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request):
        school_s = serializers.SchoolSerializer(data=request.data)

    @action(methods=['get'], detail=False, url_path='basic')
    def list_basic(self, request):
        serializer = serializers.BasicSchoolSerializer(
            many=True, instance=self.get_queryset())
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def listings(self, request, **kwargs):
        bookId = request.query_params.get('bookId', None)
        school = self.get_object()
        listings = school.listings

        if bookId:
            listings = listings.filter(book__pk=bookId)

        l_s = serializers.ListingSerializer(many=True, instance=listings)
        return Response(l_s.data)


class TransactionList(generics.ListCreateAPIView):
    serializer_class = serializers.TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        listing_owner = serializer.validated_data['listing_request'].listing.owner

        if listing_owner == request.user.customer:
            self.perform_create(serializer)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Can't fulfill a request for another user's listing"},
                status=status.HTTP_400_BAD_REQUEST
            )


class ListingSearchList(generics.ListCreateAPIView):
    serializer_class = serializers.ListingSearchSerializer
    queryset = models.ListingSearch.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if (request.user.is_anonymous):
            serializer.save()
        else:
            serializer.save(owner=request.user.customer)

        return Response(serializer.data)


class NotificationRequestViewSet(viewsets.GenericViewSet):
    serializer_class = serializers.NotificationRequestSerializer
    queryset = models.NotificationRequest.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(methods=['get'], detail=False, url_path='most-wanted')
    def most_wanted(self, request, **kwargs):
        """
        Gets the most desired books to display on the home page.
        """
        school = request.query_params.get('schoolId', None)
        nots = models.NotificationRequest.objects.filter(school=school)
        nots = nots.exclude(satisfied=True)
        nots = nots.values('book').annotate(
            count=Count('book')).order_by('-count')
        all_books = []
        for notification in nots:
            book = models.Book.objects.get(id=notification['book'])
            book_data = serializers.BookSerializer(instance=book).data

            all_books.append(
                {'book': book_data, 'count': notification['count']})

        return Response(all_books)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        book = serializer.validated_data['book']
        owner = self.request.user.customer
        month_ago = datetime.datetime.now() + datetime.timedelta(days=-30)
        matches = models.NotificationRequest.objects.filter(
            book=book, owner=owner, date_created__gt=month_ago)
        if len(matches) > 0:
            return Response({'detail': 'You cannot request a book ' +
        'more than once in the same month.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(owner=owner)

        return Response(serializer.data)
