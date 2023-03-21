const BASE_URL = 'http://127.0.0.1:8000';

// Get all movies
export const getAllMovies = async () => {
    const response = await fetch(`${BASE_URL}/api/movies/`);
    const data = await response.json();
    return data.movies; // extract movies array from the "movies" key
  };

// Get a single movie by id
export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/movies/${id}/`);
  const data = await response.json();
  return data;
};