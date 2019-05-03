import { RECEIVE_PHOTO_ERRORS } from '../../actions/photos_actions';

export const photosErrorsReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PHOTO_ERRORS:
            if (action.errors.responseJSON) {
                return action.errors.responseJSON;
            } else {
                return action.errors;
            }
        default:
            return [];
    }
};