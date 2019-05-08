export const fetchLikes = () => (
    $.ajax({
        method: 'GET',
        url: '/api/likes'
    })
);

export const like = photo_id => (
    $.ajax({
        method: 'POST',
        url: '/api/likes',
        data: { like: { photo_id } }
    })
);

export const unlike = likeId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/likes/${likeId}`
    })
);