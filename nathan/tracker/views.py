from django.shortcuts import render
from django.http import HttpResponse
from PIL import Image


def index(request):
    image = Image.new('RGB', (1,1))
    return HttpResponse(image.getdata(), content_type="image/png")