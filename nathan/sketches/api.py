from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import requests as r

@csrf_exempt
def musicmap(request, name):
    res = r.get(f"https://www.music-map.com/{name}")
    return HttpResponse(res.text)