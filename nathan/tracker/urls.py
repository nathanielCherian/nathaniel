from django.urls import path
from . import views

urlpatterns = [
    path('test.png', views.index, name="index"),
]
