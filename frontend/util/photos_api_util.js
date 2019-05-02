export const fetchPhotos = () => (
    $.ajax({
        method: 'GET',
        url: '/api/photos'
    })
);

export const fetchPhoto = photoId => (
    $.ajax({
        method: 'GET',
        url: `/api/photos/${photoId}`
    })
);