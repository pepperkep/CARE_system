import React, { useState, useEffect } from 'react';
import { SignInContext } from './context/SigninContext';
import { GroupContext } from './context/GroupContext';
import { ReportContext } from './context/ReportContext';
import { Group as G } from './interfaces/Group';
import { Report as R } from './interfaces/Report';
import { Group, Account, FAQ, Home, Report } from './pages';
import { NavigationBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [signInInfo, setSignInInfo] = useState({ userId: -1, signedIn: false });
  const [groupList, setGroupList] = useState<G[]>([]);
  const [reportList, setReportList] = useState<R[]>([]);

  useEffect(() => {
    const getReportList = async () => {
      const response = await axios.get('http://127.0.0.1:5000/report/all');

      console.log(response);
      if (response.status == 200) {
        setReportList(response.data);
      }
    }

    getReportList();
  }, [setReportList]);

  useEffect(() => {

    const getGroupList = async () => {
      const response = await axios.get('http://127.0.0.1:5000/group/all');
      console.log(response);

      if (response.status == 200) {
        setGroupList(response.data);
      }
    }

    getGroupList();
  }, [setGroupList]);

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
