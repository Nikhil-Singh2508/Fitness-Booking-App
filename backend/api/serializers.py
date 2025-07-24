from rest_framework import serializers
from .models import FitnessClass, Booking

from rest_framework import serializers
from .models import FitnessClass

class FitnessClassSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()

    class Meta:
        model = FitnessClass
        fields = ['id', 'name', 'instructor', 'date', 'time', 'available_slots']

    def get_date(self, obj):
        # Safely return date like: "24-07-2025"
        return obj.date_time.strftime("%d-%m-%Y") if obj.date_time else None

    def get_time(self, obj):
        # Safely return time like: "04:30 PM"
        return obj.date_time.strftime("%I:%M %p") if obj.date_time else None


class BookingSerializer(serializers.ModelSerializer):
    fitness_class = FitnessClassSerializer(read_only=True)
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'  # Includes: id, client_name, client_email, fitness_class, date, time

    def get_date(self, obj):
        dt = obj.fitness_class.date_time
        return dt.strftime("%d-%m-%Y") if dt else None

    def get_time(self, obj):
        dt = obj.fitness_class.date_time
        return dt.strftime("%I:%M %p") if dt else None