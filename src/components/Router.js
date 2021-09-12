import React, { Fragment } from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Navigation from 'components/Navigation';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <Fragment>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/profile'>
                            <Profile />
                        </Route>
                        <Redirect from='*' to='/' />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Route exact path='/'>
                            <Auth />
                        </Route>
                        <Redirect from='*' to='/' />
                    </Fragment>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
