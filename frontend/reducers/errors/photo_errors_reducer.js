import { RECEIVE_PHOTO_ERRORS } from '../../actions/photos_actions';

export const photosErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PHOTO_ERRORS:
            return action.errors.responseJSON;
        default:
            return [];
    }
};