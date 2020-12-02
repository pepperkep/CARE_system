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
        //update the username state
        setAccount(prevState => {
            return {
                ...prevState,
                username: e.target.value
            }
        });
    }

    const updatePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        //update the password state
        setAccount(prevState => {
            return {
                ...prevState,
                password: e.target.value
            }
        });
    }

    const signUp = async () => {
        //create query
        const query = {
            password: account.password
        }

        //send request
        const response = await axios.post(`http://127.0.0.1:5000/account/signup/${account.username}`, query);
        console.log(response);
    }

    const signIn = async () => {
        //create query
        const query = {
            username: account.username,
            password: account.password
        }

        //send request
        const response = await axios.post(`http://127.0.0.1:5000/account/login`, query);
        //update signin global state if successful
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
                <TextField placeholder="password" type="Password" onChange={updatePassword} />
            </div>

            <div className='register-action'>
                <Button onClick={signUp}>sign up</Button>
                <Button onClick={signIn}>sign in</Button>
            </div>
        </Paper>
    )
}
