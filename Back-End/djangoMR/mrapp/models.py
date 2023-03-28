from django.db import models
from django.contrib.auth.models import User

# Define the Movie model
class Movie(models.Model):
    title = models.CharField(max_length=200) # Title of the movie
    release_date = models.CharField(max_length=4) # Year of release
    synopsis = models.TextField() # Short summary of the plot
    director = models.CharField(max_length=200) # Name of the director
    main_cast = models.CharField(max_length=500) # Names of the main cast
    avg_rating = models.FloatField(default=0) # Average rating of the movie
    num_reviews = models.IntegerField(default=0) # Number of reviews for the movie

    # Return the title of the movie
    def __str__(self):
        return self.title

# Define the Review model
class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) # The movie being reviewed
    user = models.ForeignKey(User, on_delete=models.CASCADE) # The user writing the review
    rating = models.IntegerField() # The rating given by the user 
    review_text = models.TextField() # The text of the review
    score = models.IntegerField(default=0) # The score determined by review votes
    upvoted_users = models.ManyToManyField(User, related_name='upvoted_reviews') # Users who upvoted the review
    downvoted_users = models.ManyToManyField(User, related_name='downvoted_reviews') # Users who downvoted the review

    # Return a string representation of the review
    def __str__(self):
        return f"{self.user.username}'s review of {self.movie.title}"