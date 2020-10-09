from django.contrib.auth.models import User, Group
from text_trader.models import Book, Listing
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
    listings = serializers.HyperlinkedRelatedField(many=True, view_name='listings-detail', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'listings',]

class ListingSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Listing
        fields = ['owner', 'book', 'condition']