from django.urls import path
from . import views

urlpatterns = [
    path("review/", views.ReviewListCreate.as_view(), name="review-list-create"),
]