import React from 'react';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/account" exact>
          <Account />
        </Route>

        <Route path="/faq" exact>
          <FAQ />
        </Route>

        <Route path="/group" exact>
          <Group />
        </Route>

        <Route path="/reports" exact>
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
