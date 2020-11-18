import React, { useState } from 'react';
import { SignInContext } from './context/SigninContext';
import { GroupContext } from './context/GroupContext';
import { Group as G } from './interfaces/Group';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [groupList, setGroupList] = useState<G[]>([]);

  return (
    <Router>
      <SignInContext.Provider value={{
        signedIn,
        setSignedIn
      }}>
        <GroupContext.Provider value={{
          groupList,
          setGroupList
        }}>
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
        </GroupContext.Provider>
      </SignInContext.Provider>
    </Router>
  );
}

export default App;
