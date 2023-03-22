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