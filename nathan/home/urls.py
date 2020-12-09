from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('portfolio/', views.portfolio, name="portfolio"),
    path('aboutme/', views.about_me, name="about_me"),


    path('test/', views.test, name="test"),

    path('backgrounds/orbit/', views.orbit, name="orbit"),

]

