import React from 'react';
import logo from './logo.svg';
import { Group } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <NavigationBar />
        <Route path="/">
          <Group />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
