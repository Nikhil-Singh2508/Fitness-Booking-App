from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import FitnessClass, Booking
from .serializers import FitnessClassSerializer, BookingSerializer

# GET /classes
@api_view(['GET'])
def get_classes(request):
    classes = FitnessClass.objects.filter(date_time__gte=timezone.now()).order_by('date_time')
    serializer = FitnessClassSerializer(classes, many=True)
    return Response(serializer.data)


# POST /book
@api_view(['POST'])
def book_class(request):
    data = request.data
    class_name = data.get('fitness_class_name')
    client_name = data.get('client_name')
    client_email = data.get('client_email')

    if not all([class_name, client_name, client_email]):
        return Response({"error": "Missing fields."}, status=status.HTTP_400_BAD_REQUEST)

    fitness_class = get_object_or_404(FitnessClass, name=class_name)

    if fitness_class.available_slots <= 0:
        return Response({"error": "No available slots."}, status=status.HTTP_400_BAD_REQUEST)

    booking = Booking.objects.create(
        fitness_class=fitness_class,
        client_name=client_name,
        client_email=client_email
    )

    fitness_class.available_slots -= 1
    fitness_class.save()

    serializer = BookingSerializer(booking)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



# GET /bookings?email=
@api_view(['GET'])
def get_bookings(request):
    email = request.query_params.get('email')
    if not email:
        return Response({"error": "Email query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

    bookings = Booking.objects.filter(client_email=email)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)
