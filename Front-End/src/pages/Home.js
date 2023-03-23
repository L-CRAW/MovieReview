import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopMovies } from '../services/api';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const data = await getTopMovies(3);
      setMovies(data);
    };
    fetchTopMovies();
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-5">Welcome to Movie Reviews</h1>
          <p className="text-center fs-5 mb-5">
            Find movies, write reviews, and get personalized recommendations based on your movie preferences.
          </p>
          <div className="card bg-light mb-5">
            <div className="card-body">
              <h4 className="card-title">Featured Movies</h4>
              {movies.length > 0 ? (
                  <ul className="list-group list-group-flush mt-4">
                    {movies.map(movie => (
                      <li key={movie.id} className="list-group-item">
                        <h5>{movie.title}</h5>
                        <p className="mb-2">Release Date: {movie.release_date}</p>
                        <p className="mb-2">{movie.synopsis}</p>
                        <p className="mb-2">Director: {movie.director}</p>
                        <p className="mb-2">Average Rating: {movie.avg_rating}</p>
                        <p className="mb-2">Number of Reviews: {movie.num_reviews}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Loading...</p>
                )}
            </div>
          </div>
          <p className="text-center mb-0">
            To log in, please go to the <Link to="/login" className="fw-bold">login page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;