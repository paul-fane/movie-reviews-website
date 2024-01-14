from rest_framework import serializers
from .models import Review
from users.serializers import UserSerializer
from movies.serializers import FilmSerializer

class ReviewInputSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = Review
        fields = '__all__'

class ReviewOutputSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    film = FilmSerializer()
    class Meta:
        model = Review
        fields = '__all__'