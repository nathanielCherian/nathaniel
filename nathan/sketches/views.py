from django.shortcuts import render

# Create your views here.

def index(request):
    meta = {
        "title":"sketches"
    }
    return render(request, "sketches/index.html", context=meta)

def kid_cudi_motm2(request):
    meta = {
        "title":"kid cudi MOTM2"
    }
    return render(request, "sketches/kid_cudi_motm2.html", context=meta)

def chaos(request):
    meta = {
        "title":"The Lorenz Attractor"
    }
    return render(request, "sketches/lorenz.html", context=meta)

def starry_night(request):
    meta = {
        "title":"The Starry Night in 3D"
    }
    return render(request, "sketches/starry_night.html", context=meta)

def marbles(request):
    meta = {
        "title":"Marble Physics"
    }
    return render(request, "sketches/marbles.html", context=meta)

def rush_hour(request):
    meta = {
        "title":"Rush Hour Traffic"
    }
    return render(request, "sketches/rush_hour.html", context=meta)
    
def tetris(request):
    meta = {
        "title":"3D Tetris"
    }
    return render(request, "sketches/tetris.html", context=meta)

def kuramoto(request):
    meta ={
        "title":"Simulation of Spontaneous Synchronization with the Kuramoto Model",
        "description":"Simulating the Kuramoto model with metronome oscillators using THREE.js",
        "image":"meta/kuramoto.png"
    }
    return render(request, "sketches/kuramoto.html", context=meta)



def spotify(request):
    meta = {
        "title":"Spotify Collage Generator"
    }
    return render(request, "sketches/spotify.html", context=meta)
