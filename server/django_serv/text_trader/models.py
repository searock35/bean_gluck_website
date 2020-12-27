from django.db import models
import datetime


class Customer(models.Model):
    # map these additional fields to the auth.user field
    user = models.OneToOneField(
        'auth.User', on_delete=models.CASCADE, null=False, primary_key=True)

    # user should be associated with a school, but shouldn't be deleted if school gets deleted somehow
    school = models.ForeignKey('School', on_delete=models.SET_NULL, null=True)

    # the user's home area
    locality = models.ForeignKey(
        'Locality', on_delete=models.SET_NULL, blank=False, null=True)

    # the date the user was created
    date_created = models.DateField(auto_now=True, null=False)

    # year of graduation, determines when user is considered off campus
    grad_year = models.IntegerField(null=True, blank=True)

    # the user's address, optional
    address = models.CharField(max_length=45, null=True, blank=True)

    major = models.ManyToManyField('Major')

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name + " from " + self.school.name


class Book(models.Model):
    # A title for the book, a string
    title = models.CharField(
        max_length=100, help_text="Enter the book's title")

    # an optional subtitle field
    subtitle = models.CharField(
        max_length=100, help_text="Enter a subtitle, if applicable", null=True, blank=True)

    # The book's isbn. Not necessary only if there is no ISBN. Book needs either ISBN or is_custom is true.
    isbn = models.CharField(max_length=13, help_text="Enter the 13 number ISBN, if applicable", blank=True,
                            null=True, unique=True, error_messages={"unique": "A book with this ISBN already exists"})

    # Sets whether the book has an ISBN. Used to enable users to add custom binder pages/class packets
    is_custom = models.BooleanField(default=False)

    # The author(s) of the book
    authors = models.ManyToManyField('Author')

    # The edition of the book, can be null
    edition = models.PositiveSmallIntegerField(
        help_text="Enter edition number", null=True)

    # An optional description for the book.
    description = models.CharField(max_length=200, null=True)

    # Not sure if needed, but keeps track of who added the book. Not needed.
    creator = models.ForeignKey(
        'auth.User', on_delete=models.SET_NULL, null=True)

    # Used to relate books to courses
    course = models.ManyToManyField('Course', through='CourseBook')

    def save(self, *args, **kwargs):
        if (not self.is_custom) and (self.isbn == None):
            return  # The book needs an ISBN unless it is custom
        else:
            super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class Author(models.Model):
    # first name for the author
    first_name = models.CharField(max_length=25)

    middle_initial = models.CharField(max_length=1, null=True, blank=True)

    # last name for author
    last_name = models.CharField(max_length=25)

    # Not sure if needed, but keeps track of who added the book. Not needed.
    creator = models.ForeignKey(
        'auth.User', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        if (self.middle_initial == "" or self.middle_initial == None):
            middle_string = " "
        else:
            middle_string = " " + self.middle_initial + ". "

        return self.first_name + middle_string + self.last_name


class Locality(models.Model):
    # A locality references a city, state and zip code

    city = models.CharField(max_length=20, null=False, blank=False)

    # The state, etc. PA, CA, ME
    state = models.CharField(max_length=2, null=False)

    # The zip code, can be standard 5 digit or custom 9 digit
    zip_code = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.city + ", " + self.state


class School(models.Model):
    # A school is a university where sales and purchases will be made.

    # the name of the school or university
    name = models.CharField(
        max_length=40, help_text="Enter school name here", unique=True)

    # primary color
    primary_color = models.CharField(max_length=7, default='#ff6347')

    # secondary color
    secondary_color = models.CharField(max_length=7, default='#ff6347')

    # the date when the school was added
    date_added = models.DateField(auto_now_add=True)

    # The address of the school
    address = models.CharField(max_length=75, null=False, blank=False)

    # The locality (city, state, zip) of the school
    locality = models.ForeignKey("Locality", on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Listing(models.Model):
    CONDITIONS = (
        ('f', 'Like New'),
        ('nf', 'Near Fine'),
        ('vg', 'Very Good'),
        ('g', 'Good'),
        ('fr', 'Fair'),
        ('p', 'Poor'),
    )
    condition = models.CharField(max_length=2, choices=CONDITIONS)

    # the book the listing is advertised for
    book = models.ForeignKey('Book', on_delete=models.CASCADE)

    # the owner of the listing
    owner = models.ForeignKey(
        'Customer', related_name='listings', on_delete=models.CASCADE)

    # The school where the user expects to sell the listing
    school = models.ForeignKey(
        'School',
        related_name='listings',
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    # The user can provide a purchase price, rental price or both. They need to set negotiable to true
    #  to be able to set both to zero.
    purchase_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    rental_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)
    negotiable = models.BooleanField(default=False)

    # has this listing been purchased?
    fulfilled = models.BooleanField(default=False, blank=True)

    def save(self, *args, **kwargs):
        if (self.purchase_price == None) and (self.rental_price == None) and (not self.negotiable):
            return  # The listing needs at least one or the other
        else:
            super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return (f'Book: {self.book}, Owner: {self.owner}')


class ListingRequest(models.Model):
    # Listing Requests are user requests for a specific user-posted listing. The request MUST include
    # the target listing and the owner who made the request

    # associated listing which the request is for
    listing = models.ForeignKey('Listing', on_delete=models.CASCADE)

    # the user making the request
    owner = models.ForeignKey(
        'Customer', related_name='listingRequests', on_delete=models.CASCADE)

    # an optional rental price that is different from the advertised cost
    rental_asking_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)

    # an optional asking price that is different from the advertised cost
    purchase_asking_price = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'Request for {self.listing.book.title} owned by {self.listing.owner.user.first_name}'


class Major(models.Model):
    major_name = models.CharField(max_length=25, null=False)

    def __str__(self):
        return self.major_name


class Transaction(models.Model):
    # the corresponding listing request this transaction fulfills.
    listing_request = models.OneToOneField(
        'ListingRequest', on_delete=models.CASCADE, primary_key=True)

    # the final cash price of the transaction
    transaction_price = models.FloatField(null=True)

    # rented or bought?
    was_rented = models.BooleanField(default=False)

    # the date of the transaction
    date_time = models.DateTimeField(null=True)

    # the location of the transaction (optional)
    school_location = models.ForeignKey(
        'SchoolLocation', on_delete=models.SET_NULL, null=True)


class SchoolLocation(models.Model):
    # A short and unique identifier
    title = models.CharField(max_length=25)

    # A description of the location.
    description = models.CharField(max_length=150, null=True)


class Course(models.Model):
    # This is a class, used largely to suggest books to users based on major/classes
    title = models.CharField(max_length=30)

    # Course prefix, etc. ENGR
    department = models.CharField(max_length=5)

    # Number identifying level, e.g. 365
    level = models.CharField(max_length=4)

    # Identifies majors that must take this class
    major = models.ManyToManyField('Major')

    school = models.ForeignKey('School', on_delete=models.CASCADE)


class CourseBook(models.Model):
    # This table represents a many to many relationship between books
    # and the courses they are used in.

    SEMESTERS = (
        ('s', "Spring"),
        ('m', "Summer"),
        ('f', "Fall")
    )

    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    year = models.PositiveIntegerField()
    semester = models.CharField(max_length=1, choices=SEMESTERS)


class RequestMessage(models.Model):

    # The message this request is associated with.
    request = models.ForeignKey('ListingRequest', on_delete=models.CASCADE)

    # The message contents
    message = models.CharField(max_length=150, blank=False, null=False)

    # the date and time the message was sent
    datetime = models.DateTimeField(auto_now=True)

    # is the message sender the seller or buyer of the book?
    is_seller = models.BooleanField(default=False, null=False, blank=True)
