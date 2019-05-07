export const fetchFollows = () => (
    $.ajax({
        method: 'GET',
        url: '/api/follows'
    })
);

export const follow = followee_id => (
    $.ajax({
        method: 'POST',
        url: '/api/follows',
        data: { follow: { followee_id } }
    })
);

export const unfollow = followId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/follows/${followId}`
    })
);