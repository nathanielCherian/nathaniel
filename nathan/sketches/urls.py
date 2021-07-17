from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="sketch-index"),
    path('motm2/', views.kid_cudi_motm2, name="kid_cudi_motm2"),
    path('chaos/', views.chaos, name="chaos"),
    path('starry-night/', views.starry_night, name="starry-night"),
    path('marbles/', views.marbles, name="marbles"),
    path('rush-hour/', views.rush_hour, name="rush-hour"),
    path('tetris/', views.tetris, name="tetris"),
    path('kuramoto/', views.kuramoto, name="kuramoto"),
    path('hungarian/', views.hungarian_beads, name="hungarian"),
    path('ascii/', views.ascii, name="ascii"),


    path('spotify/', views.spotify, name="spotify"),
]

