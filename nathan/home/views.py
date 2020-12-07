from django.shortcuts import render
from django.http import HttpResponse

from django.views.decorators.clickjacking import xframe_options_sameorigin


def index(request):
    return render(request, "home/index.html")

def portfolio(request):
    return render(request, "home/portfolio.html")


def test(request):
    return render(request, "home/it.html")

@xframe_options_sameorigin
def orbit(request):
    return render(request, "home/orbit.html")


