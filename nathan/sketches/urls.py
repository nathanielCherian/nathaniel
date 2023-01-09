from django.urls import path
from .views import pages
from . import api


urlpatterns = [path(page[0], page[1], name=page[2]) for page in pages]
urlpatterns += [
    path('api/musicmap/<str:name>', api.musicmap, name="api_musicmap")
]

