import * as APIUtils from '../util/follows_api_util';

export const RECEIVE_FOLLOWS = 'RECEIVE_FOLLOWS';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';
export const RECEIVE_FOLLOW_ERRORS = 'RECEIVE_FOLLOW_ERRORS';

export const receieveFollows = follows => ({
    type: RECEIVE_FOLLOWS,
    follows
});

export const receieveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
});

export const removeFollow = followId => ({
    type: REMOVE_FOLLOW,
    followId
});

export const receieveErrors = errors => ({
    type: RECEIVE_FOLLOW_ERRORS,
    errors
});

export const fetchFollows = () => dispatch => (
    APIUtils.fetchFollows()
        .then(res => dispatch(receieveFollows(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const follow = followeeId => dispatch => (
    APIUtils.follow(followeeId)
        .then(res => dispatch(receieveFollow(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const unfollow = followId => dispatch => (
    APIUtils.unfollow(followId)
        .then(() => dispatch(removeFollow(followId)))
        .fail(errors => dispatch(receieveErrors(errors)))
);


