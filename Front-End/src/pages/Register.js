import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
function Register() {
    //these are three variables, including username, password and email
    const [usernameregister, setUsernameRegister] = useState('');
    const [registerpassword, setUserPasswordRegister] = useState('');
    const [email, setUserEmailRegister] = useState('');
    //these sentences are to show the variables in real-time
    const handleUsernameRegister = (event) => {
        setUsernameRegister(event.target.value);
    };
    const handleUserPasswordRegister = (event) => {
        setUserPasswordRegister(event.target.value);
    };
    const handleUserEmailRegister = (event) => {
        setUserEmailRegister(event.target.value);
    };


    const handleRegisterSubmit = (event) => {
        const newUser = {
            userName: usernameregister,
            password: registerpassword,
            email: email
        };
        event.preventDefault();
        alert("Successfully register!");
        window.location.replace('/');
        console.log(`Submitting register form with username: ${usernameregister} and password: ${registerpassword}`);
        // add your login logic here
      };


    return (
        <div className="container my-5">
        <div className="row justify-content-center">
        <div className="col-md-6">
            <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" id="username" className="form-control" value={usernameregister} onChange={handleUsernameRegister} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="registerPassword" className="form-label">Password</label>
                <input type="text" id="registerPassword" className="form-control" value={registerpassword} onChange={handleUserPasswordRegister} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" id="email" className="form-control" value={email} onChange={handleUserEmailRegister} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <div className="text-center mt-3">
            <Link to="/">Back to home page</Link>
            </div>
        </div>
        </div>
    </div>

    );
}

export default Register;