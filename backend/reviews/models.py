from django.db import models
from users.models import User
from movies.models import Film

# Create your models here.


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    film = models.ForeignKey(Film, on_delete=models.CASCADE, related_name="reviews")
    vote = models.IntegerField()
    comment = models.CharField(max_length=300)
    time = models.DateTimeField(auto_now_add=True)