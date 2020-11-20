import React, { useState, useContext } from 'react';
import { SignInContext } from '../../context/SigninContext';
import { IRegisterForm } from './RegisterForm';
import { Account } from '../../interfaces/Account';
import axios from 'axios';
import { Paper, TextField, Button } from '@material-ui/core';

import './RegistrationForm.css';

export const RegisterForm: React.FC<IRegisterForm.IProps> = ({ onSignIn, onSignUp }) => {
    const [account, setAccount] = useState<Account>({ userId: 0, username: "", password: "" });
    const { setSignedIn } = useContext(SignInContext);

    const updateUsername = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAccount(prevState => {
            return {
                ...prevState,
                username: e.target.value
            }
        });
    }

    const updatePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAccount(prevState => {
            return {
                ...prevState,
                password: e.target.value
            }
        });
    }

    const signUp = async () => {
        const query = {
            password: account.password
        }

        const response = await axios.post(`http://127.0.0.1:5000/account/signup/${account.username}`, query);
        console.log(response);
    }

    const signIn = async () => {
        const query = {
            username: account.username,
            password: account.password
        }

        const response = await axios.post(`http://127.0.0.1:5000/account/login`, query);
        if (response.data.success) {
            setSignedIn({userId: response.data.user_id, signedIn: true});
        }
        console.log(response);
    }

    return (
        <Paper className="register-base">
            <h1 style={{ marginLeft: '2.5rem' }}>Sign up/Sign in</h1>

            <div className="register-input">
                <TextField placeholder="account" onChange={updateUsername} />
                <TextField placeholder="password" onChange={updatePassword} />
            </div>

            <div className='register-action'>
                <Button onClick={signUp}>sign up</Button>
                <Button onClick={signIn}>sign in</Button>
            </div>
        </Paper>
    )
}
