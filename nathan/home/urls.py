from django.urls import path
from .views import index, orbit, test

urlpatterns = [
    path('', index, name="index"),
    path('backgrounds/orbit/', orbit, name="orbit"),

]

