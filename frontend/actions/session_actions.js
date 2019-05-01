import * as APIUtils from '../util/session_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receieveCurrentUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const logoutCurrentUser = () => ({
    type: LOGOUT
});

export const receieveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
});

export const signup = user => dispatch => (
    APIUtils.signup(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const login = user => dispatch => (
    APIUtils.login(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const logout = () => dispatch => (
    APIUtils.logout()
        .then(() => dispatch(logoutCurrentUser()))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const update = user => dispatch => (
    APIUtils.update(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);