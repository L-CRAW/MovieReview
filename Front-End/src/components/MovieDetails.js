import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, getReviewsForMovie } from '../services/api';

// Define MovieDetails component
const MovieDetails = () => {

  // Get movieId
  const { movieId } = useParams();

  // Declare state variables for movie and its reviews
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch movie details and its reviews using API service functions
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieData = await getMovieById(movieId);
      setMovie(movieData);
    };

    const fetchReviews = async () => {
        const movieReviews = await getReviewsForMovie(movieId);
        setReviews(movieReviews);
      };

    fetchMovieDetails();
    fetchReviews();
  }, [movieId]);

  // Render the movie details and its reviews once they are available
  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>{movie.title}</h1>
      <p>Synopsis: {movie.synopsis}</p>
      <p>Director: {movie.director}</p>
      <p>Main Cast: {movie.main_cast}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Average Rating: {movie.avg_rating}</p>
      <p>Number of Reviews: {movie.num_reviews}</p>
      <h2>Reviews</h2>
      <ul className="list-group">
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            <h5 className="mb-1">Username: {review.user.username}</h5>
            <p className="mb-1">Review: {review.review_text}</p>
            <p className="mb-1">Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetails;