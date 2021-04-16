from django.shortcuts import render
from django.http import HttpResponse

from django.views.decorators.clickjacking import xframe_options_sameorigin


def index(request):
    meta = {
        "title":"home"
    }
    return render(request, "home/index.html", context=meta)

def portfolio(request):
    meta = {
        "title":"portfolio"
    }
    return render(request, "home/portfolio.html", context=meta)

def about_me(request):
    meta = {
        "title":"about me"
    }
    return render(request, "home/aboutme.html", context=meta)

def test(request):
    meta = {
        
    }
    return render(request, "home/it.html")

@xframe_options_sameorigin
def orbit(request):
    return render(request, "home/orbit.html")


