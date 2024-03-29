from rest_framework import permissions
from django.contrib.auth.models import User


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user

class IsSelf(permissions.IsAuthenticated):
    """
    Custom permission that only lets the user access detail information about themself.
    """

    def has_object_permission(self, request, view, obj):
        if not request.user.is_anonymous:
            return obj.user.pk == request.user.pk

        return False

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):

        # must be owner to do anything
        if isinstance(obj, User):
            return obj == request.user

        return obj.owner.pk == request.user.pk

class IsAssociatedWithRequest(permissions.IsAuthenticated):
    """
    Custom permission to only allow a person to GET or POST a message
    if they are either the owner of the request or the owner of the listing
    associated with that request.
    """
    def has_object_permission(self, request, view, obj):
        print("Checking object permissions")
        if obj.owner.pk == request.user.pk or obj.listing.owner.pk == request.user.pk:
            return True

        return False
