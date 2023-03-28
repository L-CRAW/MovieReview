import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse

from .models import Movie, Review

class SubmitReviewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testuser", password="testpassword", email="test@email.com")
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

    def test_submit_review(self):
        # Log in the test user
        self.client.login(username="testuser", password="testpassword")

        # Prepare the review data
        review_data = {
            'username': 'testuser',
            'movieId': self.movie.id,
            'userReview': 'This is a test review.',
            'userRating': 80
        }

        # Call the submit_review view
        response = self.client.post(reverse('submit_review'), data=review_data, content_type='application/json')

        # Check the response status code and content
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])

class MoviesApiTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_movies_api(self):
        # Create sample movies
        Movie.objects.create(title="Movie 1", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")
        Movie.objects.create(title="Movie 2", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

        # Call the movies_api view
        response = self.client.get(reverse('movies_api'))

        # Check the response status code and content
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Movie 1")
        self.assertContains(response, "Movie 2")

class SearchMovieTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

    def test_search_movie(self):
        response = self.client.get(reverse('search_movie'), {'title': 'Test Movie'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['movie']['title'], 'Test Movie')

class AddMovieTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_add_movie(self):
        movie_data = {
            'title': 'New Movie',
            'mainCast': 'casttest1, casttest2',
            'director': 'test director',
            'release_date': '2000',
            'synopsis': 'test synopsis',
        }
        response = self.client.post(reverse('add_movie'), data=json.dumps(movie_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['movie']['title'], 'New Movie')

class UserReviewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testuser", password="testpassword", email="test@email.com")
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")
        self.review = Review.objects.create(movie=self.movie, user=self.user, rating=80, review_text="This is a test review.", score=0)

    def test_user_reviews(self):
        response = self.client.get(reverse('user_reviews', kwargs={'username': 'testuser'}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'testuser')

class VoteReviewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testuser", password="testpassword", email="test@email.com")
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")
        self.review = Review.objects.create(movie=self.movie, user=self.user, rating=80, review_text="This is a test review.", score=0)

    def test_vote_review(self):
        self.client.login(username="testuser", password="testpassword")

        vote_data = {'username': 'testuser'}
        response = self.client.post(reverse('vote_review', kwargs={'review_id': self.review.id, 'vote': 'up'}), data=json.dumps(vote_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])

class GetRecommendationsTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_recommendations(self):
        user = User.objects.create(username="testuser", password="testpassword")
        response = self.client.get(reverse('get_recommendations', kwargs={'username': user.username}))
        self.assertEqual(response.status_code, 200)

class MovieReviewsTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

    def test_movie_reviews(self):
        response = self.client.get(reverse('movie_reviews', kwargs={'movie_id': self.movie.id}))
        self.assertEqual(response.status_code, 200)

class MovieDetailsApiTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.movie = Movie.objects.create(title="Test Movie", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

    def test_movie_details_api(self):
        response = self.client.get(reverse('movie_details_api', kwargs={'movie_id': self.movie.id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['title'], 'Test Movie')

class TopMoviesApiTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        # Create sample movies
        Movie.objects.create(title="Top Movie 1", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")
        Movie.objects.create(title="Top Movie 2", release_date="2000", synopsis="test synopsis", director="test director", main_cast="casttest1, casttest2", avg_rating="0", num_reviews="0")

    def test_top_movies_api(self):
        response = self.client.get(reverse('top_movies_api'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Top Movie 1")
        self.assertContains(response, "Top Movie 2")