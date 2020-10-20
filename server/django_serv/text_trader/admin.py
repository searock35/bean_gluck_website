from django.contrib import admin

# Register your models here.


from .models import Book, Listing, ListingRequest

admin.site.register(Book)
admin.site.register(Listing)
admin.site.register(ListingRequest)
