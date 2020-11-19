import React, { useState } from 'react';
import { SignInContext } from './context/SigninContext';
import { GroupContext } from './context/GroupContext';
import { ReportContext } from './context/ReportContext';
import { Group as G } from './interfaces/Group';
import { Report as R } from './interfaces/Report';
import { Account as A } from './interfaces/Account';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

function App() {
  const [signInInfo, setSignInInfo] = useState({ userId: -1, signedIn: false });
  const [groupList, setGroupList] = useState<G[]>([]);
  const [reportList, setReportList] = useState<R[]>([]);

  return (
    <Router>
      <SignInContext.Provider value={{
        userId: signInInfo.userId,
        signedIn: signInInfo.signedIn,
        setSignedIn: setSignInInfo
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
