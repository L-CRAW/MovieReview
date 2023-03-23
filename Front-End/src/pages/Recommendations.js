import React, { useState, useEffect } from 'react';
import { getRecommendedMovies } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Recommendations = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const movies = await getRecommendedMovies(currentUser.username);
      setRecommendedMovies(movies);
    };

    fetchRecommendedMovies();
  }, [currentUser]);

  return (
    <div className="container mt-4">
      <h1>Recommended Movies</h1>
      {recommendedMovies.length > 0 ? (
        <ul className="list-group">
          {recommendedMovies.map((movie) => (
            <li key={movie.id} className="list-group-item">
              <h5 className="mb-1">
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              </h5>
              <p className="mb-1">Synopsis: {movie.synopsis}</p>
              <p className="mb-1">Average Rating: {movie.avg_rating.toFixed(2)}</p>
              <p className="mb-1">Number of Reviews: {movie.num_reviews}</p>
              <p className="mb-1">Recommended by: {movie.recommended_by}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="alert alert-info mt-3" role="alert">
          No recommendations yet. Upload more movie reviews to get personalized recommendations.
        </div>
      )}
    </div>
  );
};

export default Recommendations;