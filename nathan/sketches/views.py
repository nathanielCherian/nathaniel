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

def marbles(request):
    return render(request, "sketches/marbles.html")

def rush_hour(request):
    return render(request, "sketches/rush_hour.html")
    
def tetris(request):
    return render(request, "sketches/tetris.html")

def kuramoto(request):
    return render(request, "sketches/kuramoto.html")