from django.shortcuts import render
from django.http import HttpResponse
from PIL import Image


def index(request):
    image_data = open(r"Z:\Computer Science\nathaniel\nathan\home\static\home\portfolio\dontwait.png", "rb").read()
    image = Image.new('RGB', (1,1))
    return HttpResponse(image.getdata(), content_type="image/png")