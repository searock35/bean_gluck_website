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

class ListingList(generics.ListCreateAPIView):
    queryset = models.Listing.objects.all()
    serializer_class = serializers.ListingSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

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

