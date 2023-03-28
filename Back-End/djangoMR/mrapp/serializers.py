from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
     # Define a serializer to convert Review model instances to JSON format
    class Meta:
        model = Review
        fields = ('movie', 'user', 'review_text', 'rating')