from ..models import ListingRequest
from django.core.mail import send_mail

def send_new_request_notification(listing_request):
    recipient = listing_request.listing.owner.user
    book = listing_request.listing.book
    email = recipient.email
    name = recipient.first_name
    message = "Hey {name},\nYou have a new request for your book listing of the book"
        + f" {book}."

    send_mail(
        'New Book Request - TextTrader',
        message,
        'bookersrus@gmail.com',
        [email],
        fail_silently=False,
    )