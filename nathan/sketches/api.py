from django.http import HttpResponse
import requests as r

def musicmap(request, name):
    res = r.get(f"https://www.music-map.com/{name}")
    return HttpResponse(res.text)