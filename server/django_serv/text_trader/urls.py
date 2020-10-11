from django.urls import path
from text_trader import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('books/', views.BookList.as_view(), name='book-list'),
    path('books/<int:pk>/', views.BookDetail.as_view(), name='book-detail'),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('listings/', views.ListingList.as_view(), name='listing-list'),
    path('listings/<int:pk>/', views.ListingDetail.as_view(), name='listing-detail'),
    path('requests/', views.ListingRequestList.as_view(), name='request-list'),
    path('requests/<int:pk>/', views.ListingRequestDetail.as_view(), name='request-detail'),
    path('', views.api_root),
]

urlpatterns = format_suffix_patterns(urlpatterns)