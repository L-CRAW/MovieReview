from django.http import JsonResponse
import json 
from django.core import serializers
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from .models import User, Movie, Review
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import F

def movies_api(request):
    movies = Movie.objects.all().values() 
    return JsonResponse({'movies': list(movies)}, safe=False)  

def search_movie(request):
    title = request.GET.get('title', '')
    try:
        movie = Movie.objects.get(title__iexact=title)
        return JsonResponse({'movie': {'id': movie.id, 'title': movie.title}})
    except Movie.DoesNotExist:
        return JsonResponse({'movie': None})
    
@csrf_exempt
def add_movie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movie = Movie.objects.create(
            title=data['title'],
            main_cast=data['mainCast'],
            director=data['director'],
            release_date=data['release_date'],
            synopsis=data['synopsis'],
        )
        return JsonResponse({'movie': {'id': movie.id, 'title': movie.title}})
    return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def submit_review(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            user = User.objects.get(username=data['username'])
            movie = Movie.objects.get(pk=data['movieId'])
            review = Review.objects.create(
                movie=movie,
                user=user,
                review_text=data['userReview'],
                rating=data['userRating']
            )

            if movie.num_reviews == 0:
                movie.num_reviews = 1
                movie.avg_rating = review.rating
            else:
                movie.num_reviews = F('num_reviews') + 1
                movie.avg_rating = (F('avg_rating') * F('num_reviews') + review.rating) / ((F('num_reviews')) + 1)

            movie.save(update_fields=['num_reviews', 'avg_rating'])

            return JsonResponse({'success': True})
        except ObjectDoesNotExist:
            return JsonResponse({'success': False, 'error': 'User or movie not found'})

    return JsonResponse({'error': 'Invalid request method'})

def user_reviews(request, username=None):
    if request.method == 'GET':
        if username:
            try:
                user = User.objects.get(username=username)
                reviews = Review.objects.filter(user=user)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'User not found'})
        else:
            reviews = Review.objects.all()

        reviews_data = []

        for review in reviews:
            reviews_data.append({
                'id': review.id,
                'movie_title': review.movie.title,
                'review_text': review.review_text,
                'rating': review.rating,
                'user': {
                    'username': review.user.username,
                },
                'score': review.score,
                'upvoted_users': list(review.upvoted_users.values('username')),
                'downvoted_users': list(review.downvoted_users.values('username')),
            })

        return JsonResponse({'reviews': reviews_data})

    return JsonResponse({'error': 'Invalid request method'})


@csrf_exempt
def vote_review(request, review_id, vote):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')

        try:
            user = User.objects.get(username=username)
            review = Review.objects.get(pk=review_id)

            if vote == "up":
                if user in review.downvoted_users.all():
                    review.downvoted_users.remove(user)
                    review.upvoted_users.add(user)
                    review.score = F('score') + 2
                elif user not in review.upvoted_users.all():
                    review.upvoted_users.add(user)
                    review.score = F('score') + 1
            elif vote == "down":
                if user in review.upvoted_users.all():
                    review.upvoted_users.remove(user)
                    review.downvoted_users.add(user)
                    review.score = F('score') - 2
                elif user not in review.downvoted_users.all():
                    review.downvoted_users.add(user)
                    review.score = F('score') - 1
            else:
                return JsonResponse({'success': False, 'error': 'Invalid vote action'})

            review.save(update_fields=['score'])
            review.refresh_from_db() 

            return JsonResponse({
                'success': True,
                'review': {
                    'id': review.id,
                    'score': review.score,
                    'upvoted_users': list(review.upvoted_users.values('username')),
                    'downvoted_users': list(review.downvoted_users.values('username')),
                }
            })

        except ObjectDoesNotExist:
            return JsonResponse({'success': False, 'error': 'User or review not found'})

    return JsonResponse({'error': 'Invalid request method'})

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

def get_recommendations(request, username):
    user = User.objects.get(username=username)
    user_reviews = Review.objects.filter(user=user)
    
    similar_users = set()
    
    for review in user_reviews:
        similar_reviews = Review.objects.filter(
            movie=review.movie, rating__range=(review.rating - 10, review.rating + 10)
        ).exclude(user=user)
        for r in similar_reviews:
            similar_users.add(r.user)
    
    recommended_movies = set()
    
    for similar_user in similar_users:
        highly_rated_reviews = Review.objects.filter(user=similar_user, rating__gte=70)
        for review in highly_rated_reviews:
            if not user_reviews.filter(movie=review.movie).exists():
                recommended_movies.add(review.movie)
    
    recommended_movies_data = []
    for movie in recommended_movies:
        user_who_recommended = Review.objects.filter(user__in=similar_users, movie=movie, rating__gte=70).first().user
        recommended_movies_data.append({
            "id": movie.id,
            "title": movie.title,
            "synopsis": movie.synopsis,
            "avg_rating": movie.avg_rating,
            "num_reviews": movie.num_reviews,
            "recommended_by": user_who_recommended.username
        })

    return JsonResponse({"recommended_movies": recommended_movies_data})

def movie_reviews(request, movie_id):
    if request.method == 'GET':
        try:
            movie = Movie.objects.get(pk=movie_id)
            reviews = Review.objects.filter(movie=movie)

            reviews_data = []

            for review in reviews:
                reviews_data.append({
                    'id': review.id,
                    'review_text': review.review_text,
                    'rating': review.rating,
                    'user': {
                        'username': review.user.username,
                    },
                    'score': review.score,
                    'upvoted_users': list(review.upvoted_users.values('username')),
                    'downvoted_users': list(review.downvoted_users.values('username')),
                })

            return JsonResponse({'reviews': reviews_data})

        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Movie not found'})

    return JsonResponse({'error': 'Invalid request method'})

def movie_details_api(request, movie_id):
    if request.method == 'GET':
        try:
            movie = Movie.objects.get(pk=movie_id)
            movie_data = {
                'id': movie.id,
                'title': movie.title,
                'synopsis': movie.synopsis,
                'director': movie.director,
                'main_cast': movie.main_cast,
                'release_date': movie.release_date,
                'avg_rating' : movie.avg_rating,
                'num_reviews' : movie.num_reviews,
            }
            return JsonResponse(movie_data)
        except ObjectDoesNotExist:
            return JsonResponse({'error': 'Movie not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def top_movies_api(request):
    top_movies = Movie.objects.order_by('-avg_rating')[:10]
    return JsonResponse({'movies': list(top_movies.values())}, safe=False)