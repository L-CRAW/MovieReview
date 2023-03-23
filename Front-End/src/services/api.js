const BASE_URL = 'http://localhost:5000';


export const getAllMovies = async () => {
    const response = await fetch(`${BASE_URL}/api/movies/`);
    const data = await response.json();
    return data.movies; 
  };


export const getMovieById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/movies/${id}/`);
  const data = await response.json();
  return data;
};

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
// Register user
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

export const searchMovie = async (title) => {
  const response = await fetch(`${BASE_URL}/api/search_movie/?title=${encodeURIComponent(title)}`);
  const data = await response.json();
  return data.movie;
};
export const getAllReviews = async () => {
  const response = await fetch(`${BASE_URL}/api/user_reviews/`);
  const data = await response.json();
  return data.reviews;
};


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

export const getUserReviews = async (username) => {
  const response = await fetch(`${BASE_URL}/api/user_reviews/${username}`);
  const data = await response.json();
  return data.reviews;
};

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