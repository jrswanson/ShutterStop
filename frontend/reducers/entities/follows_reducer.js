import { RECEIVE_FOLLOWS, RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../../actions/follows_actions';

export const followsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_FOLLOWS:
            return action.follows;
        case RECEIVE_FOLLOW:
            newState[action.follow.id] = action.follow;
            return newState;
        case REMOVE_FOLLOW:
            delete newState[action.followId];
            return newState;
        default:
            return state;
    }
};