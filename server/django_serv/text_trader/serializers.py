from django.contrib.auth.models import User, Group
from text_trader.models import Book, Listing, ListingRequest
from rest_framework import serializers


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'isbn', 'author', 'edition']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    listings = serializers.HyperlinkedRelatedField(many=True, view_name='listing-detail', read_only=True)
    listingRequests = serializers.HyperlinkedRelatedField(many=True, view_name='request-detail', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'listings', 'listingRequests']

class ListingSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    class Meta:
        model = Listing
        fields = ['id', 'owner', 'book', 'condition', 'purchase_price']

class ListingRequestSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = ListingRequest
        fields = ['id', 'listing', 'owner', 'purchase_asking_price']
