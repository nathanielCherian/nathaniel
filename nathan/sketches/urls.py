from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="sketch-index"),
    path('motm2/', views.kid_cudi_motm2, name="kid_cudi_motm2"),
    path('chaos/', views.chaos, name="chaos"),
    path('starry-night/', views.starry_night, name="starry-night"),
    path('marbles/', views.marbles, name="marbles"),

]

