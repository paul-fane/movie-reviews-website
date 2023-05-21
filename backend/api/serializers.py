from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import User, Film, Consiglio

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'username']

class FilmSerializer(ModelSerializer):
    media = SerializerMethodField()
    class Meta:
        model = Film
        #fields = '__all__'
        fields = ['id','name', 'watchlist', 'piattaforma', 'media']

    def get_media(self, object):
        return object.mediaVoti()

class ConsiglioSerializer(ModelSerializer):
    user_id = UserSerializer()
    film_id = FilmSerializer()
    class Meta:
        model = Consiglio
        fields = '__all__'
