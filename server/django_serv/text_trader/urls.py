from django.urls import path
from text_trader import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('api/books/', views.BookList.as_view(), name='book-list'),
    path('api/books/<int:pk>/', views.BookDetail.as_view(), name='book-detail'),
    path('api/users/', views.UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('api/listings/', views.ListingList.as_view(), name='listing-list'),
    path('api/listings/<int:pk>/', views.ListingDetail.as_view(), name='listing-detail'),
    path('api/requests/', views.ListingRequestList.as_view(), name='request-list'),
    path('api/requests/<int:pk>/', views.ListingRequestDetail.as_view(), name='request-detail'),
    path('api/', views.api_root),
]

urlpatterns = format_suffix_patterns(urlpatterns)

from rest_framework.authtoken import views

urlpatterns += [
    path('api-token-auth/', views.obtain_auth_token)
]

