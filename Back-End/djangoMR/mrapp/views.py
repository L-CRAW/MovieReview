from django.http import JsonResponse
from .models import get_movies


def movies_api(request):
    movies = get_movies()
    return JsonResponse({'movies': movies})
