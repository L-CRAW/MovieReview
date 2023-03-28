from django.shortcuts import redirect
from django.urls import path
from rest_framework.decorators import api_view
from mrapp.views import movies_api, register, login, submit_review, add_movie, search_movie, user_reviews, vote_review, get_recommendations, movie_reviews, movie_details_api, top_movies_api
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('', lambda request: redirect('movies_api'), name='root'),

    # API endpoints for movies
    path('api/movies/', movies_api, name='movies_api'),
    path('api/search_movie/', search_movie, name='search_movie'),
    path('api/add_movie/', add_movie, name='add_movie'),
    path('api/movie_reviews/<int:movie_id>/', movie_reviews, name='movie_reviews'),
    path('api/movies/<int:movie_id>/', movie_details_api, name='movie_details_api'),
    path('api/top_movies/', top_movies_api, name='top_movies_api'),

    # API endpoints for user authentication
    path('api/register/', register, name='register'),
    path('api/login/', login, name='login'),

    # API endpoints for user reviews and recommendations
    path('api/submit_review/', api_view(['POST'])(submit_review), name='submit_review'),
    path('api/user_reviews/', user_reviews, name='user_reviews'),
    path('api/user_reviews/<str:username>/', user_reviews, name='user_reviews'),
    path('api/vote_review/<int:review_id>/<str:vote>/', vote_review, name='vote_review'),
    path("api/recommendations/<str:username>/", get_recommendations, name='get_recommendations'),

]