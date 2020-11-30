from django.urls import path
from text_trader import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('books/', views.BookList.as_view(), name='book-list'),
    path('books/<int:pk>/', views.BookDetail.as_view(), name='book-detail'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('customers/', views.CustomerList.as_view(), name='customer-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('listings/', views.ListingList.as_view(), name='listing-list'),
    path('listings/school/', views.SchoolListingList.as_view(), name='school-listing-list'),
    path('listings/local/', views.LocalListingList.as_view(), name='local-listing-list'),
    path('listings/<int:pk>/', views.ListingDetail.as_view(), name='listing-detail'),
    path('requests/', views.ListingRequestList.as_view(), name='request-list'),
    path('requests/<int:pk>/', views.ListingRequestDetail.as_view(), name='request-detail'),
    path('localities/', views.LocalityList.as_view(), name='locality-list'),
    path('localities/<int:pk>/', views.LocalityDetail.as_view(), name='locality-detail'),
    path('schools/', views.SchoolList.as_view(), name='school-list'),
    path('schools/<int:pk>/', views.SchoolDetail.as_view(), name='school-detail'),

    # Custom
    path('get-auth-token/', views.CustomAuthToken.as_view(), name='get-auth'),
    path('verify-user/<int:pk>', views.VerifyUser.as_view(), name='verify-user'),
    path('get-user-with-token/', views.GetOwnUser.as_view(), name='get-user'),
    path('book-search/', views.BookSearch.as_view(), name='book-search'),
    path('schools/basic/', views.BasicSchoolList.as_view(), name='school-list-basic'),
    path('register/', views.RegisterCustomer.as_view()),

    # Root
    path('', views.api_root),

]

urlpatterns = format_suffix_patterns(urlpatterns)


