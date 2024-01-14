from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def serialize(self):
        return {
            "id": self.pk,
            "username": self.username
        }