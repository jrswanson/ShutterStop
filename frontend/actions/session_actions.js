import * as sessionAPIUtils from '../util/session_api_util';
import * as userAPIUtils from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT = 'LOGOUT';
export const RECEIVE_LOGIN_ERRORS = 'RECEIVE_LOGIN_ERRORS';

export const receieveAllUsers = (users) => ({
    type: RECEIVE_USERS,
    users
});

export const receieveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const receieveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
});

export const logoutCurrentUser = () => ({
    type: LOGOUT
});

export const receieveErrors = (errors) => ({
    type: RECEIVE_LOGIN_ERRORS,
    errors
});

export const signup = user => dispatch => (
    sessionAPIUtils.signup(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const login = user => dispatch => (
    sessionAPIUtils.login(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const logout = () => dispatch => (
    sessionAPIUtils.logout()
        .then(() => dispatch(logoutCurrentUser()))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const update = user => dispatch => (
    sessionAPIUtils.update(user)
        .then(res => dispatch(receieveCurrentUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const fetchUsers = () => dispatch => (
    userAPIUtils.fetchUsers()
        .then(res => dispatch(receieveAllUsers(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const fetchUser = userId => dispatch => (
    userAPIUtils.fetchUser(userId)
        .then(res => dispatch(receieveUser(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);