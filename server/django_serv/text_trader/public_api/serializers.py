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

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    school = serializers.PrimaryKeyRelatedField(queryset=models.School.objects.all())
    locality = serializers.PrimaryKeyRelatedField(queryset=models.Locality.objects.all())
    major = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Major.objects.all())

    class Meta:
        model = models.UserCustomer 
        fields = ['id', 'user', 'school', 'locality', 'grad_year', 'major']

class BookSearchSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'isbn', 'authors', 'edition', 'creator']

class BookSerializer(serializers.HyperlinkedModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Author.objects.all())
    creator = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'isbn', 'authors', 'edition', 'creator']


class AuthorSerializer(serializers.ModelSerializer):
    creator = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    
    class Meta:
        model = models.Author
        fields = ['id', 'first_name', 'last_name', 'creator']

class ListingSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    class Meta:
        model = models.Listing
        fields = ['id', 'owner', 'book', 'condition', 'purchase_price', 'rental_price']

class ListingRequestSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    listing = ListingSerializer()
    
    class Meta:
        model = models.ListingRequest
        fields = ['id', 'listing', 'owner', 'purchase_asking_price', 'rental_asking_price']

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



class MajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Major
        fields = ['id', 'major_name']