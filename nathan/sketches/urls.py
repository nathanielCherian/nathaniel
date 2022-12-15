from django.urls import path
from . import views
from . import api

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
    path('modular/', views.modular, name="modular"),
    path('spirograph/', views.spirograph, name="spirograph"),
    path('matrix/', views.matrix, name="matrix"),
    path('field-lines/', views.field_lines, name="field-lines"),
    path('arm/', views.arm, name='arm'),
    path('ambigram/', views.ambigram, name='ambigram'),
    path('spotify/', views.spotify, name="spotify"),

    path('api/musicmap/<str:name>', api.musicmap, name="api_musicmap")
]

