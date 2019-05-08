import * as APIUtils from '../util/likes_api_util';

export const RECEIVE_LIKES = 'RECEIVE_LIKES';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';

export const receieveLikes = likes => ({
    type: RECEIVE_LIKES,
    likes
});

export const receieveLike = like => ({
    type: RECEIVE_LIKE,
    like
});

export const removeLike = likeId => ({
    type: REMOVE_LIKE,
    likeId
});

export const receieveErrors = errors => ({
    type: RECEIVE_LIKE_ERRORS,
    errors
});

export const fetchLikes = () => dispatch => (
    APIUtils.fetchLikes()
        .then(res => dispatch(receieveLikes(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const like = photoId => dispatch => (
    APIUtils.like(photoId)
        .then(res => dispatch(receieveLike(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const unlike = likeId => dispatch => (
    APIUtils.unlike(likeId)
        .then(() => dispatch(removeLike(likeId)))
        .fail(errors => dispatch(receieveErrors(errors)))
);