from django.db import models
import datetime
# Create your models here.


class Book(models.Model):

    title = models.CharField(max_length=50, help_text="Enter the book's title")
    isbn = models.CharField(max_length=13, help_text="Enter the 13 number ISBN, if applicable")
    author = models.CharField(max_length=40, help_text="Enter author name, if applicable (just one)")
    edition = models.PositiveSmallIntegerField(help_text="Enter edition number")



    def __str__(self):
        return self.title


class Listing(models.Model):
    conditions = (
        ('f', 'Like New'),
        ('nf', 'Near Fine'),
        ('vg', 'Very Good'),
        ('g', 'Good'),
        ('fr', 'Fair'),
        ('p', 'Poor'),
    )

    book = models.ForeignKey('Book', on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', related_name='listings', on_delete=models.CASCADE)
    condition = models.CharField(max_length=2, choices=conditions, help_text="Enter book condition")

class School(models.Model):
    name = models.CharField(max_length=40, help_text="Enter school name here")
    date_added = models.DateField(auto_now_add=True)

class ListingRequest(models.Model):
    listing = models.ForeignKey('Listing', on_delete=models.SET_NULL, null=True)




