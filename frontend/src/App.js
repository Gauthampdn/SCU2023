// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Driver from './components/Driver'; // Import Drive component
import Passenger from './components/Passenger'; // Import Passenger component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/drive" component={Driver} />
        <Route path="/passenger" component={Passenger} />
      </Switch>
    </Router>
  );
}

export default App;
