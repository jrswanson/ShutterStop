export const fetchComments = () => (
    $.ajax({
        method: 'GET',
        url: '/api/comments'
    })
);

export const addComment = comment => (
    $.ajax({
        method: 'POST',
        url: '/api/comments',
        data: { comment }
    })
);

export const deleteComment = commentId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/comments/${commentId}`
    })
);