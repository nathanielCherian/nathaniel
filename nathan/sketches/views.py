from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "sketches/index.html")

def kid_cudi_motm2(request):
    return render(request, "sketches/kid_cudi_motm2.html")

def chaos(request):
    return render(request, "sketches/lorenz.html")

def starry_night(request):
    return render(request, "sketches/starry_night.html")