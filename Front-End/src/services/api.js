const BASE_URL = 'https://2750568l.pythonanywhere.com';


// retrieves all movies from the API.
export const getAllMovies = async () => {
    const response = await fetch(`${BASE_URL}/api/movies/`);
    const data = await response.json();
    return data.movies; 
  };

// retrieves a movie with the specified ID from the API.
export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/movies/${id}/`);
  const data = await response.json();
  return data;
};

// attempts to log in a user with the specified credentials.
export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  });
  const data = await response.json();
  
  if (data.success) {
    return { user: { username: data.user.username, email: data.user.email }, success: true };
  } else {
    return { success: false };
  }
};

// registers a new user with the specified username, password, and email.
export const registerUser = async (username, password, email) => {
  const response = await fetch(`${BASE_URL}/api/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password, email: email })
  });
  const data = await response.json();
  return data.success;
};

// adds a new movie with the specified details to the API.
export const addMovie = async (movieDetails) => {
  const response = await fetch(`${BASE_URL}/api/add_movie/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieDetails)
  });
  const data = await response.json();
  return data.movie;
};

// searches for a movie with the specified title on the API
export const searchMovie = async (title) => {
  const response = await fetch(`${BASE_URL}/api/search_movie/?title=${encodeURIComponent(title)}`);
  const data = await response.json();
  return data.movie;
};

// retrieves all reviews from the API.
export const getAllReviews = async () => {
  const response = await fetch(`${BASE_URL}/api/user_reviews/`);
  const data = await response.json();
  return data.reviews;
};

// submits a new review to the API for the specified user.
export const submitReview = async (review, username) => {
  const response = await fetch(`${BASE_URL}/api/submit_review/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...review, username: username })
  });
  const data = await response.json();
  return data.success;
};

// retrieves all reviews submitted by the specified user from the API.
export const getUserReviews = async (username) => {
  const response = await fetch(`${BASE_URL}/api/user_reviews/${username}`);
  const data = await response.json();
  return data.reviews;
};

// submits an upvote or downvote for the specified review and user.
export const voteReview = async (reviewId, vote, username) => {
  try {
    const response = await fetch(`${BASE_URL}/api/vote_review/${reviewId}/${vote}/`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error voting review:', error);
    return null;
  }
};

// retrieves a list of recommended movies for the specified user from the API.
export const getRecommendedMovies = async (username) => {
  const response = await fetch(`${BASE_URL}/api/recommendations/${username}`);
  const data = await response.json();
  return data.recommended_movies;
};

// retrieves all reviews for the movie with the specified ID from the API.
export const getReviewsForMovie = async (id) => {
  const response = await fetch(`${BASE_URL}/api/movie_reviews/${id}`);
  const data = await response.json();
  return data.reviews;
};

// retrieves a list of the top-rated movies from the API, up to the specified number.
export const getTopMovies = async (numMovies) => {
  const response = await fetch(`${BASE_URL}/api/top_movies/?num_movies=${numMovies}`);
  const data = await response.json();
  return data.movies;
};
