import { createContext } from 'react';

export interface SigninInterface {
    signedIn: boolean,
    setSignedIn: (isTrue: boolean) => void
}

export const SignInContext = createContext<SigninInterface>({ signedIn: false, setSignedIn: () => { } });