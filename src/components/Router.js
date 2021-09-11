import React, { Fragment, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <Fragment>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                    </Fragment>
                ) : (
                    <Route exact path='/'>
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
