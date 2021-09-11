import React, { Fragment, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

    return (
        <Fragment>
            <AppRouter isLoggedIn={isLoggedIn} />;
            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </Fragment>
    );
};

export default App;
