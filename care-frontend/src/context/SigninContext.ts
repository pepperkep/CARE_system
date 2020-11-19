import { createContext } from 'react';

export interface SignInInfoInterface {
    userId: number;
    signedIn: boolean;
}

export interface SigninInterface {
    userId: number;
    signedIn: boolean;
    setSignedIn: (signInInfo: any) => void
}

export const SignInContext = createContext<SigninInterface>({ userId: -1, signedIn: false, setSignedIn: () => { } });