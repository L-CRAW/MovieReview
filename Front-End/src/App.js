import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Register from './pages/Registration';
import UploadReview from './pages/UploadReview';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext'; 

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/upload-review">
            <UploadReview />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/reviews">
            <Reviews />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
