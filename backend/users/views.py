from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework import permissions

from rest_framework import status

from .models import User
from .serializers import UserSerializer


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        email = data["email"]
        password = data["password"]
        confirmation = data["confirmation"]

        if password == confirmation:
            if User.objects.filter(email=email).exists():
                return Response("Email already registered!",status=status.HTTP_400_BAD_REQUEST)
            else: 
                if len(password) < 6:
                    return Response ('Password must be at least 6 characters',status=status.HTTP_400_BAD_REQUEST)
                else:
                    # Attempt to create new user
                    try:
                        user = User.objects.create_user(username, email, password)
                    except IntegrityError:
                        return Response("Username not available!",status=status.HTTP_404_NOT_FOUND)

                    return Response('User added successfully!')
        else:
            return Response("Passwords must match!",status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    username = request.user.username

    currentUser = User.objects.get(username=username)
    serializer = UserSerializer(currentUser, many=False)
    
    return Response(serializer.data)
