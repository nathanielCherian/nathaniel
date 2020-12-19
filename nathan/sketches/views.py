from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "sketches/index.html")

def kid_cudi_motm2(request):
    return render(request, "sketches/kid_cudi_motm2.html")
