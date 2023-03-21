import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
//this will cause errors shown in the console of the web page
  useEffect(() => {
    fetch('http://127.0.0.1:8000/movies/')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-5">Welcome to the home page</h1>
          <p className="text-center">To log in, please go to the <Link to="/login" className="fw-bold">login page</Link>.</p>
          <ul className="list-group mt-5">
            {movies.map(movie => (
              <li key={movie.id} className="list-group-item">
                <h5>{movie.title}</h5>
                <p>Release Date: {movie.release_date}</p>
                <p>{movie.synopsis}</p>
                <p>Director: {movie.director}</p>
                <p>Average Rating: {movie.avg_rating}</p>
                <p>Number of Reviews: {movie.num_reviews}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;