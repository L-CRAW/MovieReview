import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting login form with username: ${username} and password: ${password}`);
    // add your login logic here
  };

  return (
    <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Log In</button>
        </form>
        <div className="text-center mt-3">
          <Link to="">Back to home page</Link>
        </div>
      </div>
    </div>
  </div>

  );
}

export default Login;