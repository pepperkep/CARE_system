import React, { useState, useContext, useEffect } from 'react';
import { SignInContext } from '../../context/SigninContext';
import { ReportContext } from '../../context/ReportContext';
import { RegisterForm, Report, ReportCard } from '../../components';
import axios from 'axios';

import './account.css';
import { Grid } from '@material-ui/core';

export const Account = () => {
    const { signedIn, userId, setSignedIn } = useContext(SignInContext);
    const { reportList, setReportList } = useContext(ReportContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get(`http://127.0.0.1:5000/account/${userId}`);
            setUserName(response.data.username);
            console.log(response);
        }

        getUserName();
    }, [userId]);

    if (signedIn) {
        return (
            <div className='account-base'>
                <h1>Hello {userName}</h1>

                <h3>Your Proposed Reports</h3>
                {reportList.map((report, index) => {
                    if (report.userId == userId) {
                        console.log('hello');
                        return (
                            <Grid>
                                <Report id={report.id} content={report.content} group={report.group} />
                            </Grid>
                        )
                    }
                })}
            </div >
        )
    }

    return (
        <div className='account-base'>
            <RegisterForm onSignIn={() => { setSignedIn(true) }} />
        </div>
    );
}
