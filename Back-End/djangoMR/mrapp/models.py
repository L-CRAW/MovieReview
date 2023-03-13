from django.db import models
from django.db import connection


def get_movies():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM Movies")
        columns = [col[0] for col in cursor.description]
        movies = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return movies
