from django.shortcuts import render
from django.http import HttpResponse

from django.views.decorators.clickjacking import xframe_options_sameorigin


def index(request):
    return render(request, "home/index.html")


def test(request):
    return render(request, "home/test.html")

@xframe_options_sameorigin
def orbit(request):
    return render(request, "home/orbit.html")


