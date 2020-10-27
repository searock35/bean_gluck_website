from django.contrib.auth.models import User, Group
from rest_framework import serializers
from text_trader import models

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    listings = serializers.HyperlinkedRelatedField(many=True, view_name='listing-detail', read_only=True)
    listingRequests = serializers.HyperlinkedRelatedField(many=True, view_name='request-detail', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'listings', 'listingRequests']

class BookSerializer(serializers.HyperlinkedModelSerializer):
    authors = serializers.HyperlinkedRelatedField(view_name='author-detail', read_only=True)

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'isbn', 'authors', 'edition']

class AuthorSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    
    class Meta:
        model = models.Author
        fields = ['id', 'first_name', 'last_name', 'creator', 'edition']

class ListingSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    class Meta:
        model = models.Listing
        fields = ['id', 'owner', 'book', 'condition', 'purchase_price']

class ListingRequestSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = models.ListingRequest
        fields = ['id', 'listing', 'owner', 'purchase_asking_price']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['id', 'listing_request', 'transaction_price', 'date_time', 'school_location']

class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    locality_id = serializers.HyperlinkedRelatedField(view_name='locality-detail', read_only=True)
    class Meta:
        model = models.School
        fields = ['id', 'school_name', 'primary_color', 'secondary_color', 'date_added', 'school_address', 'locality_id']

class LocalitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Locality
        fields = ['id', 'city', 'state', 'zip_code']
