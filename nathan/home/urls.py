from django.urls import path
from .views import index, orbit, test

urlpatterns = [
    path('', index, name="index"),
    path('orbit/', orbit, name="orbit"),
    path('test/', test, name="test"),

]

