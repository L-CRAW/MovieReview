import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Header from './components/Header';
import Register from './pages/Register';
function App() {
  return (
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
        <Route path = "/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
