import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Redirect to="/discover" /> : <Component {...props} />
        )}
    />
);

const Protected = ({ component: Component, path, loggedIn }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/login" />
        )}
    />
);

const mapStateToProps = state => ({
    loggedIn: state.session.id !== null
});

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
