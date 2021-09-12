import React, { Fragment, useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

const App = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <Fragment>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}

            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </Fragment>
    );
};

export default App;
