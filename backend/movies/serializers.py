from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Film


class FilmSerializer(ModelSerializer):
    media = SerializerMethodField()
    visto = SerializerMethodField(source='get_visto')
    class Meta:
        model = Film
        fields = ['id','name', 'watchlist', 'piattaforma', 'media', 'visto']

    def get_media(self, object):
        return object.mediaVoti()
    
    def get_visto(self, object):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            if user in object.watchlist.all():
                    return True
        return False