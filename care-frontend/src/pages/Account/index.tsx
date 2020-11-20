import React, { useState, useContext, useEffect } from 'react';
import { SignInContext } from '../../context/SigninContext';
import { RegisterForm, ReportCard } from '../../components';
import axios from 'axios';

import './account.css';

export const Account = () => {
    const { signedIn, userId, setSignedIn } = useContext(SignInContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get(`http://127.0.0.1:5000/account/${userId}`);
            setUserName(response.data.username);
            console.log(response);
        }

        getUserName();
    }, [signedIn]);

    if (signedIn) {
        return (
            <div className='account-base'>
                <h1>Hello {userName}</h1>
                <ReportCard />
            </div>
        )
    }

    return (
        <div className='account-base'>
            <RegisterForm onSignIn={() => { setSignedIn(true) }} />
        </div>
    );
}
