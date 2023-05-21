from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Avg
from django.db.models.functions import Round

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def serialize(self):
        return {
            "id": self.pk,
            "username": self.username
        }
    
class Film(models.Model):
    name = models.CharField(max_length=300)
    watchlist = models.ManyToManyField("User", blank=True, related_name="films")
    piattaforma = models.CharField(max_length=64)

    def __str__(self):
        return self.name
    
    # La media di tutti i voti che un film ha ricevuto
    def mediaVoti(self):
        return self.consigli.all().aggregate( voto__avg=Round(Avg("voto"), 2) )
        #return self.consigli.all().aggregate(Avg("voto"))
        

class Consiglio(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="consigli")
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE, related_name="consigli")
    voto = models.IntegerField()
    commento = models.CharField(max_length=300)
    time = models.DateTimeField(auto_now_add=True)