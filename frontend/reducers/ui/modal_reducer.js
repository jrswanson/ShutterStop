import { NEW_PHOTO_MODAL, CLEAR_MODAL } from '../../actions/ui_actions';

export const modalReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case NEW_PHOTO_MODAL:
            return "new photo";
        case CLEAR_MODAL:
            return null;
        default:
            return state;
    }
};