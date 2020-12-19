from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="sketch-index"),
    path('cudi-motm2/', views.kid_cudi_motm2, name="kid_cudi_motm2"),
]

