from rest_framework import permissions, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from django.contrib.auth.models import User
from text_trader.permissions import IsOwnerOrReadOnly
from text_trader import models
from text_trader import serializers


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'listings': reverse('listing-list', request=request, format=format),
        'listingRequests': reverse('request-list', request=request, format=format),
        'books': reverse('book-list', request=request, format=format),
        'authors': reverse('author-list', request=request, format=format),
        'schools': reverse('school-list', request=request, format=format),
    })

class BookList(generics.ListCreateAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AuthorList(generics.ListCreateAPIView):
    queryset = models.Author.objects.all()
    serializer_class = serializers.AuthorSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Author.objects.all()
    serializer_class = serializers.AuthorSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# class PurchaseList(generics.ListAPIView):
#     serializer_class = PurchaseSerializer

#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """
#         queryset = Purchase.objects.all()
#         username = self.request.query_params.get('username', None)
#         if username is not None:
#             queryset = queryset.filter(purchaser__username=username)
#         return queryset

class ListingList(generics.ListCreateAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = models.Listing.objects.all()
        schoolId = self.request.query_params.get('schoolId', None)
        bookId = self.request.query_params.get('bookId', None)
        user_set = models.UserCustomer.filter(school = schoolId)
        return models.Listing.objects.filter(book = bookId)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class ListingRequestList(generics.ListCreateAPIView):
    queryset = models.ListingRequest.objects.all()
    serializer_class = serializers.ListingRequestSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

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
    
class LocalityList(generics.ListAPIView):
    queryset = models.Locality.objects.all()
    serializer_class = serializers.LocalitySerializer

class LocalityDetail(generics.RetrieveAPIView):
    queryset = models.Locality.objects.all()
    serializer_class = serializers.LocalitySerializer

class SchoolList(generics.ListAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer

class SchoolDetail(generics.RetrieveAPIView):
    queryset = models.School.objects.all()
    serializer_class = serializers.SchoolSerializer

