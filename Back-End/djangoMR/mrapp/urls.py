from django.shortcuts import redirect
from django.urls import path

from mrapp.views import movies_api, register, login

urlpatterns = [
    path('', lambda request: redirect('movies_api'), name='root'),
    path('api/movies/', movies_api, name='movies_api'),
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),
]