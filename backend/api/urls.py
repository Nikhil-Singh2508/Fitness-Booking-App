from django.urls import path
from .views import get_classes, book_class, get_bookings

urlpatterns = [
    path('classes/', get_classes),
    path('book/', book_class),
    path('bookings/', get_bookings),
]
