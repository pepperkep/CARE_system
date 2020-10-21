import React from 'react';
import logo from './logo.svg';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/">
          <Home />
        </Route>

        <Route path="/acount">
          <Account />
        </Route>

        <Route path="/faq">
          <FAQ />
        </Route>

        <Route path="/group">
          <Group />
        </Route>

        <Route path="/Report">
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
