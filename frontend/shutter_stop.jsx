import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/store';
import { signup, login, logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const store = createStore();
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    ReactDOM.render(<div>It's working!</div>, root);
});