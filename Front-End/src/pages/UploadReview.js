import React, { useState } from 'react';
import { searchMovie, addMovie, submitReview } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function UploadReview() {

  // Defining state variables
  const [movieTitle, setMovieTitle] = useState('');
  const [movieFound, setMovieFound] = useState(false);
  const [setMovie] = useState(null);
  const { currentUser } = useAuth();
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    mainCast: '',
    director: '',
    release_date: '',
    synopsis: ''
  });
  const [review, setReview] = useState({
    movieId: '',
    movieName: '',
    userReview: '',
    userRating: ''
  });

  // Handling the movie search when the user clicks the "Search Movie" button
  const handleMovieSearch = async () => {
    const result = await searchMovie(movieTitle);
    if (result) {
      setMovie(result);
      setMovieFound(true);
      setReview({ ...review, movieName: result.title, movieId: result.id });
    } else {
      setMovieFound(false);
    }
  };

  // Handling the changes in the movie details input fields
  const handleMovieDetailsChange = (event) => {
    setMovieDetails({
      ...movieDetails,
      [event.target.name]: event.target.value
    });
  };

  // Handling the changes in the review input fields
  const handleReviewChange = (event) => {
    setReview({
      ...review,
      [event.target.name]: event.target.value
    });
  };

  // Handling the submission of movie details
  const handleSubmitMovie = async () => {
    const newMovie = await addMovie(movieDetails);
    if (newMovie) {
      setMovie(newMovie);
      setMovieFound(true);
      setReview({ ...review, movieName: newMovie.title, movieId: newMovie.id });
      setMovieTitle(newMovie.title);
    }
  };

  // Handling the submission of the review
  const handleSubmitReview = async () => {
    const success = await submitReview(review, currentUser.username);
    if (success) {
      alert('Review submitted successfully!');
    } else {
      alert('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <h2>Upload Review</h2>
      <div className="mb-3">
        <label htmlFor="movieTitle" className="form-label">Movie Title</label>
        <input
          type="text"
          id="movieTitle"
          className="form-control"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleMovieSearch}>Search Movie</button>
      </div>
      {movieFound && (
            <div>
            <h3>Movie found! Add your review:</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="userReview" className="form-label">Review</label>
                <textarea
                  id="userReview"
                  className="form-control"
                  name="userReview"
                  value={review.userReview}
                  onChange={handleReviewChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="userRating" className="form-label">Rating (out of 100)</label>
                <input
                  type="number"
                  id="userRating"
                  className="form-control"
                  name="userRating"
                  value={review.userRating}
                  onChange={handleReviewChange}
                  min="0"
                  max="100"
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>Submit Review</button>
            </form>
          </div>
        )}
        {!movieFound && (
          <div>
            <h3>Movie not found. Please add movie details:</h3>
            <form>
              {/* Render movie details form */}
              {Object.keys(movieDetails).map((key) => (
                  <div className="mb-3" key={key}>
                  <label htmlFor={key} className="form-label">
                    {key === 'mainCast'
                      ? 'Main Cast (2 to 3 Actors)'
                      : key === 'release_date' ? 'Year of Release'
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === 'synopsis' ? (
                    <textarea
                      id={key}
                      className="form-control"
                      name={key}
                      value={movieDetails[key]}
                      onChange={handleMovieDetailsChange}
                      rows="5"
                    ></textarea>
                  ) : (
                    <input
                      type={key === 'release_date' ? 'number' : 'text'}
                      id={key}
                      className="form-control"
                      name={key}
                      value={movieDetails[key]}
                      onChange={handleMovieDetailsChange}
                      placeholder={
                        key === 'mainCast' ? 'Separate cast members with commas e.g. Johnny Depp, Tom Cruise, Christian Bale' : ''
                      }
                      min={key === 'release_date' ? 1900 : undefined}
                      max={key === 'release_date' ? 2023 : undefined}
                    />
                  )}
                </div>
              ))}
            </form>
            <button className="btn btn-primary" onClick={handleSubmitMovie}>Add Movie</button>
          </div>
        )}
    </div>
  );
}

export default UploadReview;