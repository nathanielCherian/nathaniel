from django.urls import path
from . import views

urlpatterns = [
    path('', views.newindex, name="v2_index_home"),

    # v1 stuff
    path('v1/', views.index, name="index"),
    path('v1/portfolio/', views.portfolio, name="portfolio"),
    path('v1/aboutme/', views.about_me, name="about_me"),
    path('v1/backgrounds/orbit/', views.orbit, name="orbit"),
]

