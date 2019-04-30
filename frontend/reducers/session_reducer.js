import { RECEIVE_USER, LOGOUT } from '../actions/session_actions';

export const sessionReducer = (state = { id: null }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type) {
        case RECEIVE_USER:
            newState = { id: action.user.id };
            return newState;
        case LOGOUT:
            newState = { id: null };
            return newState;
        default:
            return state;
    }
};