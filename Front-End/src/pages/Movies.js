import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getAllMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4" style={{ color: '#FF6347' }}>Movies</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Release Date</th>
              <th>Synopsis</th>
              <th>Director</th>
              <th>Main Cast</th>
              <th>Average Rating</th>
              <th>Number of Reviews</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
                    {movie.title}
                  </Link>
                </td>
                <td>{movie.release_date}</td>
                <td>{movie.synopsis}</td>
                <td>{movie.director}</td>
                <td>{movie.main_cast}</td>
                <td>{movie.avg_rating}</td>
                <td>{movie.num_reviews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movies;