from django.urls import path
from . import views

urlpatterns = [
    path("platform/", views.platformList, name="platform-list"),
    path("film/", views.MovieListCreate.as_view(), name="film-list-create"),
    path("film/<int:pk>/update-watchlist/", views.MovieUpdate.as_view(), name="film-update-watchlist"),
]