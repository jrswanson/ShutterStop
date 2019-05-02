import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/store';
import Root from './components/root';
import { fetchPhotos, fetchPhoto } from './actions/photos_actions';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = createStore(preloadedState);
        delete window.currentUser;
    } else {
        store = createStore();
    }

    window.dispatch = store.dispatch;
    window.fetchPhotos = fetchPhotos;
    window.fetchPhoto = fetchPhoto;

    ReactDOM.render(<Root store={store}/>, root);
});