import { RECEIVE_USERS, RECEIVE_USER, RECEIVE_CURRENT_USER } from '../../actions/session_actions';

export const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_USERS:
            return action.users;
        case RECEIVE_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.user.id]: action.user });
        default:
            return state;
    }
};