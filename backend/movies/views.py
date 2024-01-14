from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Film
from .serializers import FilmSerializer

from .selectors import filter_queryset


class MovieListCreate(generics.ListCreateAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        
        queryset = Film.objects.all()
        queryset = filter_queryset(queryset, request, *args, **kwargs)

        serializer = FilmSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permission() for permission in self.permission_classes]
        return [AllowAny()]



class MovieUpdate(generics.UpdateAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def partial_update(self, request, pk, *args, **kwargs):
        film = Film.objects.get(id=pk)
        user = request.user
        if user in film.watchlist.all():
            film.watchlist.remove(user)
        else:
            film.watchlist.add(user)

        return Response("Success!")
    

@api_view(['GET'])
def platformList(request):
    if request.method == "GET":
        # Platform List
        piattaforma = Film.objects.values_list('piattaforma').distinct()

        return Response(piattaforma)
