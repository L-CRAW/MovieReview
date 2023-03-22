from django.http import JsonResponse
import json 
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from .models import User, Movie

def movies_api(request):
    movies = Movie.objects.all().values() 
    return JsonResponse({'movies': list(movies)}, safe=False)  

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        

        if user is not None:
            auth_login(request, user)
            return JsonResponse({'success': True, 'user': {'username': user.username, 'email': user.email}})
        else:
            return JsonResponse({'success': False})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)

        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            auth_login(request, user)
            return JsonResponse({'success': True})
        except:
            return JsonResponse({'success': False})

    return JsonResponse({'error': 'Invalid request method'})