import { RECEIVE_PHOTOS, RECEIVE_PHOTO, REMOVE_PHOTO } from '../../actions/photos_actions';

export const photosReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_PHOTOS:
            return Object.assign(newState, action.photos);
        case RECEIVE_PHOTO:
            newState[action.photo.id] = action.photo;
            return newState;
        case REMOVE_PHOTO:
            delete newState[action.photoId];
            return newState;
        default:
            return state;
    }
};