# Generated by Django 4.2.1 on 2023-07-26 09:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Consiglio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voto', models.IntegerField()),
                ('commento', models.CharField(max_length=300)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('film_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='consigli', to='movies.film')),
            ],
        ),
    ]
