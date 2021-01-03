from django.urls import path
from text_trader import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'customers', views.CustomerViewSet)
router.register(r'schools', views.SchoolViewSet)
router.register(r'books', views.BookViewSet)
router.register(r'requests', views.RequestViewSet)
router.register(r'listings', views.ListingViewSet)
# router.register(r'requests/messages', views.RequestMessageViewSet)

urlpatterns = [
    # path('requests/', views.ListingRequestList.as_view(), name='request-list'),

    # Custom
    path('auth/', views.CustomAuthToken.as_view(), name='auth'),      # Given username and password, return token
    path('listing-search/', views.ListingSearchList.as_view(), name='listing-search-list'),
    # path('listings/', views.ListingList.as_view(), name='listing-list'),            # Given listing info, post a listing OR list listings
    # path('listings/school/', views.SchoolListingList.as_view(), name='school-listing-list'),    # Post listings of school given a schoolID and bookID as query params
    # path('listings/local/', views.LocalListingList.as_view(), name='local-listing-list'),       # Post listings of locality given a schoolID and bookID as query params


    # # Root
    # path('', views.api_root),

]

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += router.urls


