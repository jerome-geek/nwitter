import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { authService } from 'fbase';

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    return (
        <Fragment>
            <button onClick={onLogOutClick}>Log Out</button>
        </Fragment>
    );
};

export default Profile;
