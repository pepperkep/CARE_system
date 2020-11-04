import React from 'react';
import { IRegisterForm } from './RegisterForm';
import { Paper, TextField, Button } from '@material-ui/core';

import './RegistrationForm.css';

export const RegisterForm: React.FC<IRegisterForm.IProps> = ({ onSignIn, onSignUp }) => {
    return (
        <Paper className="register-base">
            <h1 style={{ marginLeft: '2.5rem' }}>Sign up</h1>

            <div className="register-input">
                <TextField placeholder="account" />
                <TextField placeholder="password" />
            </div>

            <div className='register-action'>
                <Button onClick={onSignUp}>sign up</Button>
                <Button onClick={onSignIn}>sign in</Button>
            </div>
        </Paper>
    )
}
