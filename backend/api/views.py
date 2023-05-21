import json
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .util import merge_sort
from .models import User, Film, Consiglio
from .serializers import FilmSerializer, ConsiglioSerializer , UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register(request):
    """Registrarsi alla piattaforma"""

    data = json.loads(request.body)
    username = data["username"]
    email = data["email"]
    password = data["password"]
    confirmation = data["confirmation"]

    # Ensure password matches confirmation
    if password != confirmation:
        return Response("Passwords must match!",status=status.HTTP_400_BAD_REQUEST)

    # Email check
    try:
        email = User.objects.get(email=email)
        if email:
            return Response("Email already registered!",status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        pass
    
    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
    except IntegrityError:
        return Response("Username not available!",status=status.HTTP_404_NOT_FOUND)
    
    return Response('User added successfully!')



@api_view(['GET', 'POST'])
def filmsUnauthenticated(request):
    """Vedere la lista dei film, richiesta non autenticata"""

    if request.method == "GET":
        # Lista piattaforme
        piattaforma = Film.objects.values_list('piattaforma').distinct()

        return Response({
            'piattaforma': piattaforma
        })
    
    if request.method == 'POST':
        data = json.loads(request.body)

        name = data["name"]
        piattaforma = data["piattaforma"]
        media = data["media"]

        # Tutti i film
        movies = Film.objects.all()

        # Filtra per nome e piattaforma
        if name != '':
            movies = movies.filter(name__contains=name)
        if piattaforma != '':
            movies = movies.filter(piattaforma=piattaforma)

        # Per ogni film aggiungi la media di tutti i voti ricevuti
        listaFilm = []
        for film in movies:
            mediaVoti = film.mediaVoti()
            movie = {
                'id': film.id,
                'name': film.name,
                'piattaforma': film.piattaforma,
                "media": mediaVoti['voto__avg']
            }
            listaFilm.append(movie)

        # Ordinati per la media dei voti ricevuti
        if media == 'true':
            listaFilm = reversed(merge_sort(listaFilm))
        
        return Response(listaFilm)


@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def getFilms(request):
    """Vedere la lista dei film, richiesta autenticata"""
    """Filtrare per film visti/non visti"""
    """Filtrare i film per piattaforma"""
    """Visualizzare i film non visti consigliati da tutti gli altri utenti ordinati per la media dei voti ricevuti"""

    if request.method == 'GET':
        user = request.user

        # Tutti i film
        listaFilm = Film.objects.all()

        # Crea una lista di tutti i film, aggiungendo un boolean che indica se l’utente loggato ha già visto il film
        # Aggiungendo anche la media di tutti i voti ricevuti
        movies = []
        for film in listaFilm:
            mediaVoti = film.mediaVoti()
            # Controlla se l'utente loggato è nella lista delle persone che hanno visto il film
            if user in film.watchlist.all():
                movie = {
                    'id': film.id,
                    'name': film.name,
                    'piattaforma': film.piattaforma,
                    'visto': True,
                    "media": mediaVoti['voto__avg']
                }
                movies.append(movie)
            else:
                movie = {
                    'id': film.id,
                    'name': film.name,
                    'piattaforma': film.piattaforma,
                    'visto': False,
                    "media": mediaVoti['voto__avg']
                }
                movies.append(movie)

        # Lista delle piattaforme
        piattaforma = Film.objects.values_list('piattaforma').distinct()

        return Response({
            'movies': movies,
            'piattaforma': piattaforma
        })
    
    if request.method == 'POST':
        data = json.loads(request.body)

        piattaforma = data["piattaforma"]
        name = data["name"]
        visto = data["visto"]
        media = data["media"]

        user = request.user

        # Tutti i Film | Film Filtrati
        movies = Film.objects.all()
        filmFiltrati = []

        # Filtra in base alle preferenze ricevute dall'utente: 
        # Nome Film | Piattaforma | Visti/Non visti | Ordinati per la media dei voti ricevuti
        if name != '':
            movies = movies.filter(name__contains=name)
        if piattaforma != '':
            movies = movies.filter(piattaforma=piattaforma)
        if visto != '':
            # Se l'utente vuole vedere i film visti
            if visto == "visto":
                for film in movies:
                    # Ad ogni film aggiungere media voti e boolean(Visto=True)
                    mediaVoti = film.mediaVoti()
                    if user in film.watchlist.all():
                        movie = {
                            'id': film.id,
                            'name': film.name,
                            'piattaforma': film.piattaforma,
                            'visto': True,
                            "media": mediaVoti['voto__avg']
                        }
                        filmFiltrati.append(movie)

            # Se l'utente vuole vedere i film non visti
            else:
                for film in movies:
                    # Ad ogni film aggiungere media voti e boolean(Visto=False)
                    mediaVoti = film.mediaVoti()
                    if user not in film.watchlist.all():
                        movie = {
                            'id': film.id,
                            'name': film.name,
                            'piattaforma': film.piattaforma,
                            'visto': False,
                            "media": mediaVoti['voto__avg']
                        }
                        filmFiltrati.append(movie)
        
        # Se l'utente vuole vedere sia i film visti che i film non visti
        else:
            for film in movies:
                mediaVoti = film.mediaVoti()
                if user in film.watchlist.all():
                    movie = {
                        'id': film.id,
                        'name': film.name,
                        'piattaforma': film.piattaforma,
                        'visto': True,
                        "media": mediaVoti['voto__avg']
                    }
                    filmFiltrati.append(movie)
                else:
                    movie = {
                        'id': film.id,
                        'name': film.name,
                        'piattaforma': film.piattaforma,
                        'visto': False,
                        "media": mediaVoti['voto__avg']
                    }
                    filmFiltrati.append(movie)
        
        # Se l'utente vuole i film ordinati per la media dei voti ricevuti
        if media == 'true':
            filmFiltrati = reversed(merge_sort(filmFiltrati))
        
        return Response(filmFiltrati)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFilm(request):
    """Aggiungere un nuovo film alla piattaforma"""

    if request.method == 'POST':
        data = json.loads(request.body)
        name = data["name"]
        piattaforma = data["piattaforma"]

        if name == '' or piattaforma == '':
            return Response("Necessario aggiungere un film ed una piattaforma", status=status.HTTP_400_BAD_REQUEST)

        # Aggiungi film
        addFilm = Film.objects.create(name=name, piattaforma=piattaforma.lower())
        return Response("Film added successfully!")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def watchlist(request):
    """Segnare un film nella lista come 'visto' """

    data = json.loads(request.body)
    
    film_id = data["id"]
    film_name = data["name"]

    film = Film.objects.get(id=film_id, name=film_name)
    user = request.user

    # Se l'utente (loggato) è nella lista dei film visti => vuole uscire
    # Altrimenti => vuole entrare
    if user in film.watchlist.all():
        film.watchlist.remove(user)
    else:
        film.watchlist.add(user)

    return Response("Success!")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addConsiglio(request):
    """Postare un consiglio"""

    data = json.loads(request.body)
    film = data["film"]
    voto = data["voto"]
    commento = data["commento"]

    user = request.user

    # Controlla il voto(puo essere da 1 a 10)
    if int(voto) < 1 and int(voto) > 10:
        return Response("Il voto deve essere da 1 a 10!",status=status.HTTP_400_BAD_REQUEST)
    
    # Controlla se il film ricevuto è valido
    try:
        movie = Film.objects.get(id=film['id'], name=film['name'], piattaforma=film['piattaforma'])
    except Film.DoesNotExist:
        return Response("Il film per il quale vuoi aggiungere il consiglio non esiste!",status=status.HTTP_400_BAD_REQUEST)

    # Aggiungi consiglio
    Consiglio.objects.create(user_id=user, film_id=movie, voto=voto, commento=commento)

    return Response("Consiglio aggiunto con successo!")


@api_view(['POST'])
def consigli(request, pk):
    """Visualizzare tutti i consigli su un determinato film, offrendo la possibilità di ordinare per voto"""

    if request.method == 'POST':
        data = json.loads(request.body)
        voto = data["voto"]

        # Controlla se il film ricevuto è valido
        try:
            movie = Film.objects.get(id=pk)
        except Film.DoesNotExist:
            return Response("Il film per il quale vuoi vedere i consigli non esiste!",status=status.HTTP_400_BAD_REQUEST)

        # Controlla il voto(puo essere da 1 a 10)
        if voto != "" and int(voto) < 1 and int(voto) > 10:
            return Response("Il voto deve essere da 1 a 10!", status=status.HTTP_400_BAD_REQUEST)
        
        
        #consigli = movie.consigli.all().order_by('voto')
        consigli = movie.consigli.all()

        # Filtra i consigli per voto
        if voto != "":
            consigli = consigli.filter(voto=int(voto))
            serializer = ConsiglioSerializer(consigli, many=True)
            return Response(serializer.data)
        
        # Altrimenti se non è stato ricevuto un voto per il quale filtrare i consigli
        # Spedisci i dati senza filtrarli
        else:
            serializer = ConsiglioSerializer(consigli, many=True)
            return Response(serializer.data)
        

@api_view(['GET','POST'])
def utente(request, pk):
    """Visualizzare tutti i consigli postati da un utente, offrendo la possibilità di ordinare per voto e per piattaforma"""

    if request.method == 'GET':

        # Controlla se l'utente esiste
        try:
            utente = User.objects.get(id=int(pk))
        except User.DoesNotExist:
            return Response("Utente inesistente",status=status.HTTP_400_BAD_REQUEST)
        
        consigli = utente.consigli.all()

        # Numero dei consigli postati
        lunghezzaConsigli = len(consigli)

        # Lista delle piattaforme
        piattaforme = Film.objects.values_list('piattaforma').distinct()

        # Serialize Data
        serializerConsigli = ConsiglioSerializer(consigli, many=True)
        serializerUtente = UserSerializer(utente)
        return Response({
            "numeroConsigli":lunghezzaConsigli,
            "utente": serializerUtente.data,
            "consigli": serializerConsigli.data,
            "piattaforme": piattaforme
        })

    if request.method == 'POST':
        # Filtra i consigli

        data = json.loads(request.body)
        voto = data["voto"]
        piattaforma = data["piattaforma"]

        # Controlla se l'utente esiste
        try:
            utente = User.objects.get(id=int(pk))
        except User.DoesNotExist:
            return Response("Utente inesistente",status=status.HTTP_400_BAD_REQUEST)
        
        consigli = utente.consigli.all()

        # Filtra
        if piattaforma != '':
            consigli = consigli.filter(film_id__piattaforma=piattaforma)
        if voto != '':
            consigli = consigli.filter(voto=int(voto))
            serializer = ConsiglioSerializer(consigli, many=True)
            return Response(serializer.data)
        else:
            serializer = ConsiglioSerializer(consigli, many=True)
            return Response(serializer.data)
        


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def filmConsigliatiDaUtente(request, pk):
    """Visualizzare tutti i film ancora non visti (dall utente loggato) consigliati da un altro utente."""
    
    # Film visti dall utente loggato
    currentUser = request.user
    currentUserMovies = currentUser.films.all()

    try:
        utente = User.objects.get(id=int(pk))
    except User.DoesNotExist:
        return Response("Utente inesistente",status=status.HTTP_400_BAD_REQUEST)

    # Consigli da un altro utente
    utenteConsigli = utente.consigli.all()

    serializerCurrentUserMovies = FilmSerializer(currentUserMovies, many=True)
    serializerUtenteConsigli = ConsiglioSerializer(utenteConsigli, many=True)

    movies = []
    # Per ogni film consigliato dall'altro utente,
    for consiglio in serializerUtenteConsigli.data:
        # Controlla se il film non è nella lista dei film visti dall'utente loggato
        if consiglio['film_id'] not in serializerCurrentUserMovies.data:
            # Aggiungi alla list dai film ancora non visti consigliati da un altro utente (se il film non è gia nella lista)
            if consiglio['film_id'] not in movies:
                movies.append(consiglio['film_id'])

    return Response(movies)