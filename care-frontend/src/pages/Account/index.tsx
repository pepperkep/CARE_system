import React, { useContext } from 'react';
import { SignInContext } from '../../context/SigninContext';
import { RegisterForm } from '../../components';

import './account.css';

export const Account = () => {
    const { signedIn, setSignedIn } = useContext(SignInContext);

    if (signedIn) {
        return (
            <div>this is account page</div>
        )
    }

    return (
        <div className='account-base'>
            <RegisterForm onSignIn={() => { setSignedIn(true) }} />
        </div>
    );
}
