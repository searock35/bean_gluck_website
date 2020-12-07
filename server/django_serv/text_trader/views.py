from rest_framework import permissions, generics, filters
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.models import User
from text_trader.permissions import IsOwnerOrReadOnly, IsOwner
from text_trader import models
from text_trader import serializers

    
class BookViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ['isbn', 'title', 'authors__first_name', 'authors__last_name', 'course__title']

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            serializer.save()
        else:
            serializer.save(creator=self.request.user)

    @action(methods=['get'], detail=False, url_path='search')
    def search(self, request, **kwargs):
        queryset = self.get_queryset()
        queryset = filters.SearchFilter().filter_queryset(request, queryset, self)
        BSS = serializers.BookSearchSerializer
        return Response([BSS(book).data for book in queryset])

class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

class CustomerViewSet(viewsets.GenericViewSet):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    def create(self, request):
        # request should include locality, user info, customer
        l = serializers.LocalitySerializer(data=request.data.pop('locality'))
        u = serializers.UserSerializer(data=request.data.pop('user'))
        cust = serializers.CustomerSerializer(data=request.data)

        if not l.is_valid():
            return Response({'error':l.errors}, status=status.HTTP_400_BAD_REQUEST)
        elif not u.is_valid():
            return Response({'error':u.errors}, status=status.HTTP_400_BAD_REQUEST)
        elif not cust.is_valid():
            return Response({'error':cust.errors}, status=status.HTTP_400_BAD_REQUEST)

        locality = l.save()
        user = u.save()
        cust.save(locality=locality, user=user)

        return Response(cust.data)

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

    @action(detail=False, methods=['get'], 
        url_path='get-with-token', permission_classes=[permissions.IsAuthenticated])
    def get_with_token(self, request):
        customer = models.Customer.objects.get(user=request.user)
        serializer = serializers.CustomerInfoSerializer(customer)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='verify-user')
    def verify_user(self, request, **kwargs):
        # simply return their user information
        if (request.user.pk == int(kwargs['pk'])):
            return Response({'success':'User validated succesfully'})
        else:
            return Response({'error':'Invalid token for this user'}, status=status.HTTP_401_UNAUTHORIZED)

class ListingList(generics.ListCreateAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def get_queryset(self):
        user=self.request.user
        if user.is_anonymous:
            return None
        else:
            return models.Listing.objects.filter(owner=self.request.user.customer)

    def create(self, request, *args, **kwargs):
        # check for customer
        try:
            customer = models.Customer.objects.get(user=request.user)
        except models.Customer.DoesNotExist:
            return Response({"error":"User has no customer attribute"}, status=status.HTTP_400_BAD_REQUEST)

        override_status = request.data.pop('override', 'False')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data
        if override_status == 'False':
            listing_matches = models.Listing.objects.filter(book=d['book'], owner=customer)
            if len(listing_matches) > 0:
                # don't save, just respond
                return Response({"error":"A partial match to this listing exists"}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer, customer)
        
        return Response(serializer.data)

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticated]

class ListingRequestList(generics.ListCreateAPIView):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    def get_queryset(self):
        base_set = models.ListingRequest.objects.all()
        
        if not self.request.user.is_anonymous:
            userId = self.request.query_params.get('userId', None)
            listingId = self.request.query_params.get('listingId', None)

            if  userId == str(self.request.user.pk):
                base_set = base_set.filter(owner=self.request.user.customer)
            if listingId != None:
                base_set = base_set.filter(listing__pk=listingId)

        return base_set 

    def create(self, request, *args, **kwargs):
        cust = request.user.customer 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data
        listing = models.Listing.objects.get(pk=d['listing'].pk)
        if (cust.pk == listing.owner.pk):
            return Response({"error":"Cannot create a request for one's own listing"}, status=status.HTTP_400_BAD_REQUEST)

        elif (len(models.ListingRequest.objects.filter(owner=cust, listing=d['listing']))):
            return Response({"error":
                "You have already made a request for this listing." 
                + "Please edit your old request or delete it before adding a new one."
            }, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            self.perform_create(serializer, cust)
            return Response(serializer.data)

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticated]

class LocalListingList(generics.ListAPIView):
    serializer_class = serializers.ListingSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            schoolId = self.request.query_params.get('schoolId', None)
            if schoolId != None:
                return models.Listing.objects.filter(owner__school=schoolId)

        else:
            return models.Listing.objects.filter(owner__locality=self.request.user.locality)

        return models.Listing.objects.all()

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class RequestMessageList(viewsets.GenericViewSet):
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
        listing_request = models.ListingRequest.objects.get(pk=listing_request_pk)

        if listing_request.owner.pk == request.user.pk:
            self.perform_create(serializer, False)
            return Response(serializer.data)

        elif listing_request.listing.owner.pk == request.user.pk:
            self.perform_create(serializer, True)
            return Response(serializer.data)
        
        else:
            return Response({"error":"You can't post a message on this request"})

    def perform_create(self, serializer, is_seller):
        serializer.save(is_seller=is_seller)

class SchoolListingList(generics.ListAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def get_queryset(self):
        base_set = models.Listing.objects.all()
        schoolId = self.request.query_params.get('schoolId', None)
        print(schoolId)
        bookId = self.request.query_params.get('bookId', None)
        
        if bookId != None:
            base_set = base_set.filter(book=bookId)
            
        if schoolId != None:
            base_set = base_set.filter(owner__school=schoolId)

        return base_set 

class SchoolViewSet(viewsets.GenericViewSet):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request):
        school_s = serializers.SchoolSerializer(data=request.data)

    @action(methods=['get'], detail=False, url_path='basic')
    def list_basic(self, request):
        BSS = serializers.BasicSchoolSerializer
        return Response([BSS(school).data for school in self.get_queryset()])

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
                {"error":"Can't fulfill a request for another user's listing"}, 
                status=status.HTTP_400_BAD_REQUEST
                )

