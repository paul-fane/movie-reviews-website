# Generated by Django 4.2.1 on 2024-01-13 10:52

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_alter_film_watchlist'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reviews', '0002_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Consiglio',
            new_name='Review',
        ),
    ]
