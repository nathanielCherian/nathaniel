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
        "title":"The Lorenz Attractor",
        "image":"sketches/lorenz.png"
    }
    return render(request, "sketches/lorenz.html", context=meta)

def starry_night(request):
    meta = {
        "title":"The Starry Night in 3D",
        "image":"sketches/starrynight.png"
    }
    return render(request, "sketches/starry_night.html", context=meta)

def marbles(request):
    meta = {
        "title":"Marble Physics"
    }
    return render(request, "sketches/marbles.html", context=meta)

def rush_hour(request):
    meta = {
        "title":"Rush Hour Traffic",
        "image":"sketches/rush_hour.png"
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

def hungarian_beads(request):
    meta = {
        "title":"Hungarian Beads Online",
        "image":"sketches/hungarian.png"
    }
    return render(request, "sketches/hungarian.html", context=meta)

def ascii(request):
    meta = {
        "title":"ascii webcam",
        "description":"View the world in ascii, now in color!",
        "image":"sketches/ascii.png"
    }
    return render(request, "sketches/ascii.html", context=meta)

def modular(request):
    meta = {
        "title":"modular multiplication",
       "description":"Generate cool shapes using modular multiplication. The foundation of RSA encryption.",
        "image":"sketches/modular.png"
    }
    return render(request, "sketches/modular.html", context=meta)

def spirograph(request):
    meta = {
        "title":"spirograph",
        "description":"A spirograph is a simple mechanical device that produces a continuous circular motion. It is used as a visual aid in mathematics and is a common symbol in many cultures. lol github autopilot wrote that description - ngc",
        "image":"sketches/spirograph.png"
    }
    return render(request, "sketches/sp2.html", context=meta)


def matrix(request):
    meta = {
        "title":"matrix",
        "description": "The matrix effect",
        "image":"sketches/matrix.png"
    }
    return render(request, "sketches/matrix.html", context=meta)