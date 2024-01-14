from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from .models import Review
from users.models import User
from movies.models import Film

from .serializers import ReviewOutputSerializer, ReviewInputSerializer


class ReviewListCreate(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        if "film" in request.query_params and request.GET.get("film") != "":
            film_id = request.GET.get("film")

            queryset = self.queryset.filter(film=film_id)
            if "vote" in request.query_params and request.GET.get("vote") != '':
                vote = request.GET.get("vote")
                queryset = queryset.filter(vote=vote)
            serializer = ReviewOutputSerializer(queryset, many=True)
            return Response(serializer.data)
        elif "user" in request.query_params and request.GET.get("user") != "":
            user = request.GET.get("user")
            try:
                selectedUser = User.objects.get(id=user)
            except User.DoesNotExist:
                return Response("The user for which you want to see the reviews was not found!",status=status.HTTP_400_BAD_REQUEST)
            queryset = selectedUser.reviews.all()
            if "vote" in request.query_params and request.GET.get("vote") != '':
                vote = request.GET.get("vote")
                queryset = queryset.filter(vote=vote)
            if "piattaforma" in request.query_params:
                piattaforma = request.GET.get("piattaforma")
                if piattaforma != '':
                    queryset = queryset.filter(film__piattaforma=piattaforma)
            if "visto" in request.query_params and request.GET.get("visto") != '':
                visto = request.GET.get("visto")
                if visto == "true" and request.user:
                    user = request.user
                    queryset = queryset.exclude(film__watchlist=user)
            serializer = ReviewOutputSerializer(queryset, many=True)
            return Response(serializer.data)

        return Response("Something went wrong",status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        film = self.request.data['film']
        try:
            movie = Film.objects.get(id=film)
        except Film.DoesNotExist:
            return Response("The movie for which you want to add the reviews was not found!",status=status.HTTP_400_BAD_REQUEST)
        
        return self.create(request, *args, **kwargs)
    

    def get_serializer_class(self):
        """Return the serializer class for request."""
        if self.request.method == 'GET':
            return ReviewOutputSerializer
        elif self.request.method == 'POST':
            return ReviewInputSerializer
        
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permission() for permission in self.permission_classes]
        return [AllowAny()]