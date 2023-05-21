from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("register/", views.register, name="register"),
    path("addFilm/", views.addFilm, name="addFilm"),
    path("films/", views.getFilms, name="getFilms"),
    path("filmsUnauthenticated/", views.filmsUnauthenticated, name="filmsUnauthenticated"),
    path("watchlist/", views.watchlist, name="watchlist"),
    path("addConsiglio/", views.addConsiglio, name="addConsiglio"),
    path("consigli/<str:pk>/", views.consigli, name="consigli"),
    path("utente/<str:pk>/", views.utente, name="utente"),
    path("filmConsigliatiDaUtente/<str:pk>/", views.filmConsigliatiDaUtente, name="filmConsigliatiDaUtente"),
]