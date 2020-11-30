from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator 
from text_trader import models

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], 
            validated_data['email'],
            validated_data['password'],
            validated_data['first_name'],
            validated_data['last_name']
        )

        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

# Just for viewing
class CustomerSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)
    school = serializers.PrimaryKeyRelatedField(queryset=models.School.objects.all())
    locality = serializers.PrimaryKeyRelatedField(queryset=models.Locality.objects.all())
    major = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Major.objects.all())

    class Meta:
        model = models.Customer 
        fields = ['id', 'user', 'school', 'locality', 'grad_year', 'major']


class BookSearchSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'isbn', 'authors', 'edition', 'creator']

class MajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Major
        fields = ['id', 'major_name']

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

class ListingSerializer(serializers.ModelSerializer):
    owner = CustomerSerializer(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=models.Book.objects.all())
    class Meta:
        model = models.Listing
        fields = ['id', 'owner', 'book', 'condition', 'purchase_price', 'rental_price']

class ListingRequestSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.user.username')
    listing = serializers.PrimaryKeyRelatedField(queryset=models.Listing.objects.all())
    
    class Meta:
        model = models.ListingRequest
        fields = ['id', 'listing', 'owner', 'purchase_asking_price', 'rental_asking_price']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['id', 'listing_request', 'transaction_price', 'date_time', 'school_location']

class SchoolSerializer(serializers.ModelSerializer):
    locality = serializers.PrimaryKeyRelatedField(queryset=models.Locality.objects.all())
    class Meta:
        model = models.School
        fields = ['id', 'name', 'primary_color', 'secondary_color', 'date_added', 'address', 'locality']

class LocalitySerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # search for exiting localities and return those if they exist
        l_matches = models.Locality.objects.filter(
            city=validated_data['city'],
            state=validated_data['state'],
            zip_code__contains=validated_data['zip_code'])
        if len(l_matches):
            return l_matches[0]
        else:
            return models.Locality.objects.create(**validated_data)

    class Meta:
        model = models.Locality
        fields = ['id', 'city', 'state', 'zip_code']

class RegisterCustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    school = serializers.PrimaryKeyRelatedField(queryset=models.School.objects.all())
    locality = LocalitySerializer()
    major = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Major.objects.all())

    def create(self, validated_data):
        l = LocalitySerializer(data=validated_data.pop('locality'))
        u = UserSerializer(data=validated_data.pop('user'))

        if not l.is_valid():
            raise serializers.ValidationError({'detail':l.errors})
        elif not u.is_valid():
            raise serializers.ValidationError({'detail':u.errors})
        
        user = u.save()
        locality = l.save()
        majors = validated_data.pop('major')
        ret = models.Customer.objects.create(**validated_data, user=user, locality=locality)

        for m in majors:
            ret.major.add(m)

        return ret

    class Meta:
        model = models.Customer 
        fields = ['id', 'user', 'school', 'locality',
                    'grad_year', 'address', 'major']

class BasicSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = ['id', 'name']
