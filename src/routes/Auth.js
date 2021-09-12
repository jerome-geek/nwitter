import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
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
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
