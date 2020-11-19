import React, { useState } from 'react';
import { SignInContext } from './context/SigninContext';
import { GroupContext } from './context/GroupContext';
import { ReportContext } from './context/ReportContext';
import { Group as G } from './interfaces/Group';
import { Report as R } from './interfaces/Report';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [groupList, setGroupList] = useState<G[]>([]);
  const [reportList, setReportList] = useState<R[]>([]);

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
          <ReportContext.Provider value={{
          reportList,
          setReportList
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
        </ReportContext.Provider>
        </GroupContext.Provider>
      </SignInContext.Provider>
    </Router>
  );
}

export default App;
