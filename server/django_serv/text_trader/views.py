from rest_framework import permissions, generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework import filters
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.models import User
from text_trader.permissions import IsOwnerOrReadOnly, IsOwner
from text_trader import models
from text_trader import serializers


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'customers': reverse('customer-list', request=request, format=format),
        'listings': reverse('listing-list', request=request, format=format),
        'listing-requests': reverse('request-list', request=request, format=format),
        'books': reverse('book-list', request=request, format=format),
        'book-search': reverse('book-search', request=request, format=format),
        'authors': reverse('author-list', request=request, format=format),
        'schools': reverse('school-list', request=request, format=format),
        'majors': reverse('major-list', request=request, format=format),
        'localities': reverse('locality-list', request=request, format=format),
    })

    
class VerifyUser(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.BasicUserSerializer
    permission_classes = [IsOwner]

class GetOwnUser(APIView):
    def get(self, request, format=None):
        customer = models.Customer.objects.get(user=request.user)
        serializer = serializers.CustomerInfoSerializer(customer)
        return Response(serializer.data)



class CustomAuthToken(ObtainAuthToken):

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

class RegisterCustomer(generics.CreateAPIView):
    serializer_class = serializers.RegisterCustomerSerializer

    permission_classes = [permissions.AllowAny]
    

class BookList(generics.ListCreateAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer

    permission_classes = [permissions.IsAuthenticated]

class BookSearch(generics.ListAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['isbn', 'title', 'authors__first_name', 'authors__last_name']


class BasicSchoolList(generics.ListAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.BasicSchoolSerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = models.Author.objects.all()
    serializer_class = serializers.AuthorSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Author.objects.all()
    serializer_class = serializers.AuthorSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ListingList(generics.CreateAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

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
        
        serializer.save()
        return Response(serializer.data)

    def perform_create(self, serializer, customer):
        serializer.save(owner=customer)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SchoolListingList(generics.ListAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def get_queryset(self):
        base_set = models.Listing.objects.all()
        schoolId = self.request.query_params.get('schoolId', None)
        bookId = self.request.query_params.get('bookId', None)
        
        if bookId != None:
            base_set = base_set.filter(book=bookId)
            
        if schoolId != None:
            base_set.filter(owner__school=schoolId)

        return base_set 

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

class ListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class ListingRequestList(generics.ListCreateAPIView):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    def perform_create(self, serializer):
        cust = models.Customer.objects.get(user = self.request.user)
        serializer.save(owner=cust)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ListingRequestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CustomerDetail(generics.RetrieveAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    
class LocalityList(generics.ListCreateAPIView):
    queryset = models.Locality.objects.all()
    serializer_class = serializers.LocalitySerializer

class LocalityDetail(generics.RetrieveAPIView):
    queryset = models.Locality.objects.all()
    serializer_class = serializers.LocalitySerializer

class SchoolList(generics.ListCreateAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer

class SchoolDetail(generics.RetrieveAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer

class MajorList(generics.ListCreateAPIView):
    queryset = models.Major.objects.all()
    serializer_class = serializers.MajorSerializer
