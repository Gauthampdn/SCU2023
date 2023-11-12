// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'; // Import the authentication context hook

// Import your page components
import HomePage from './components/HomePage';
import Driver from './components/Driver';
import Passenger from './components/Passenger';
import Login from './components/Login';

function App() {
  const { user } = useAuthContext(); // Destructure user from the auth context

  return (
    <Router>
      <Switch>
        {/* Redirect unauthenticated users to the Login page */}
        <Route path="/" exact render={() => (
          user ? <HomePage /> : <Redirect to="/login" />
        )} />
        <Route path="/drive" render={() => (
          user ? <Driver /> : <Redirect to="/login" />
        )} />
        <Route path="/passenger" render={() => (
          user ? <Passenger /> : <Redirect to="/login" />
        )} />
        <Route path="/login" render={() => (
          !user ? <Login /> : <Redirect to="/" />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
