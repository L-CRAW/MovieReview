from django.contrib.auth.models import User
from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=200)
    release_date = models.CharField(max_length=4)
    synopsis = models.TextField()
    director = models.CharField(max_length=200)
    main_cast = models.CharField(max_length=500)
    avg_rating = models.FloatField(default=0)
    num_reviews = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField()

    def __str__(self):
        return f"{self.user.username}'s review of {self.movie.title}"