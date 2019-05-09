import * as APIUtils from '../util/comments_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receieveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const receieveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const receieveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const fetchComments = () => dispatch => (
    APIUtils.fetchComments()
        .then(res => dispatch(receieveComments(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const addComment = comment => dispatch => (
    APIUtils.addComment(comment)
        .then(res => dispatch(receieveComment(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const deleteComment = commentId => dispatch => (
    APIUtils.deleteComment(commentId)
        .then(() => dispatch(removeComment(commentId)))
        .fail(errors => dispatch(receieveErrors(errors)))
);