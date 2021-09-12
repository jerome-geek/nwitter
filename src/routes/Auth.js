import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from '@firebase/auth';
import { authService } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;

        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let data;
            if (newAccount) {
                // Create Account
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password,
                );
            } else {
                // Log In
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password,
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;
        let provider;

        if (name === 'google') {
            provider = new GoogleAuthProvider();
        }
        if (name === 'github') {
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value={newAccount ? 'Create Account' : 'Log In'}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div>
                <button name='google' onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name='github' onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
};

export default Auth;
