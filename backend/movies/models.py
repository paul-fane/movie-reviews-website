from users.models import User
from django.db import models
from django.db.models import Avg
from django.db.models.functions import Round

# Create your models here.
class Film(models.Model):
    name = models.CharField(max_length=300)
    watchlist = models.ManyToManyField(User, blank=True, related_name="films")
    piattaforma = models.CharField(max_length=64)

    def __str__(self):
        return self.name
    
    # La media di tutti i voti che un film ha ricevuto
    def mediaVoti(self):
        return self.reviews.all().aggregate( vote__avg=Round(Avg("vote"), 2) )['vote__avg']
        #return self.consigli.all().aggregate(Avg("vote"))



    