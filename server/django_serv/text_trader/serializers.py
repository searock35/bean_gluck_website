from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.validators import UniqueValidator 
from text_trader import models

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], 
            validated_data['email'],
            validated_data['password'],
        )
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.save()

        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']

class CustomerSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)
    school = serializers.PrimaryKeyRelatedField(queryset=models.School.objects.all())
    locality = serializers.PrimaryKeyRelatedField(read_only=True)
    major = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Major.objects.all())

    class Meta:
        model = models.Customer 
        fields = ['user', 'school', 'locality', 'grad_year', 'major']

# Meant to be passed a customer instance
class CustomerInfoSerializer(serializers.Serializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    user_id = serializers.ReadOnlyField(source='user.id')
    school_id = serializers.ReadOnlyField(source='school.id')
    school_name = serializers.ReadOnlyField(source='school.name')
    school_primary_color = serializers.ReadOnlyField(source='school.primary_color')
    school_secondary_color = serializers.ReadOnlyField(source='school.secondary_color')
    grad_year = serializers.ReadOnlyField()
    home_city = serializers.ReadOnlyField(source='locality.city')
    majors = serializers.StringRelatedField(source='major', many=True)

class BookSearchSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'isbn', 'authors', 'edition', 'creator']

class MajorSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Major
        fields = ['id', 'major_name']

class AuthorSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    
    def create(self, validated_data):
        # search for exiting localities and return those if they exist
        a_matches = models.Author.objects.filter(
            first_name=validated_data['first_name'],
            middle_initial=validated_data.get('middle_initial', None),
            last_name=validated_data['last_name']
        )

        if len(a_matches) > 0:
            return a_matches[0]
        else:
            return models.Author.objects.create(**validated_data)

    class Meta:
        model = models.Author
        fields = ['id', 'first_name', 'middle_initial', 'last_name', 'creator']

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    creator = serializers.PrimaryKeyRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=models.Course.objects.all(), 
        write_only=True, 
        required=False
    )

    def create(self, validated_data):
        if len(validated_data['authors']) > 3:
            raise serializers.ValidationError({'detail':'Max 3 Authors Allowed'})

        authors_data = validated_data.pop('authors', None)

        # first save book to avoid saving unused authors
        book = models.Book.objects.create(**validated_data)

        # save each author
        for author_data in authors_data:
            author_data['creator'] = validated_data.get('creator', None).pk
            a = AuthorSerializer(data=author_data)

            if a.is_valid():
                saved_author = a.save()
                book.authors.add(saved_author)

            else:
                print(a.errors)

        return book

    class Meta:
        model = models.Book
        fields = ['id', 'title', 'subtitle', 'isbn', 'authors', 'edition', 'creator', 'course']

class ListingSerializer(serializers.ModelSerializer):
    # We want to show the whole customer info, hence the CustomerSerializer
    owner = CustomerSerializer(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=models.Book.objects.all())
    school = serializers.PrimaryKeyRelatedField(queryset=models.School.objects.all(), write_only=True)
    school_name = serializers.ReadOnlyField(source='school.name')
    condition_display = serializers.ReadOnlyField(source='get_condition_display')

    class Meta:
        model = models.Listing
        fields = ['id', 'owner', 'school', 'school_name', 'book', 'condition','condition_display', 'purchase_price', 'rental_price']

class ListingRequestSerializer(serializers.ModelSerializer):
    owner_id = serializers.ReadOnlyField(source='owner.user.username')
    owner_first_name = serializers.ReadOnlyField(source='owner.user.first_name')
    owner_last_name = serializers.ReadOnlyField(source='owner.user.last_name')
    listing = serializers.PrimaryKeyRelatedField(write_only=True, queryset=models.Listing.objects.all())
    listing_data = ListingSerializer(source='listing', read_only=True)

    
    class Meta:
        model = models.ListingRequest
        fields = ['id', 'listing', 'listing_data', 'owner_id', 'owner_first_name', 'owner_last_name', 'purchase_asking_price', 'rental_asking_price']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = ['id', 'listing_request', 'transaction_price', 'date_time', 'school_location']

class SchoolSerializer(serializers.ModelSerializer):
    locality = serializers.PrimaryKeyRelatedField(queryset=models.Locality.objects.all())
    class Meta:
        model = models.School
        fields = ['id', 'name', 'primary_color', 'secondary_color', 'date_added', 'address', 'locality']

class CourseSerializer(serializers.ModelSerializer):
    major = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = models.Course
        fields = ['title', 'department', 'level', 'major', 'school']


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

class BasicSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.School
        fields = ['id', 'name']

class MessageSerializer(serializers.ModelSerializer):
    request = serializers.PrimaryKeyRelatedField(write_only=True, queryset=models.ListingRequest.objects.all())
    datetime = serializers.ReadOnlyField(source='datetime')

    class Meta:
        model = models.RequestMessage
        fields = ['request','message','datetime']
