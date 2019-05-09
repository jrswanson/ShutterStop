import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comments_actions';

export const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
};