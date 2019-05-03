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

export const uploadPhoto = photo => (
    $.ajax({
        method: 'POST',
        url: '/api/photos',
        data: photo,
        contentType: false,
        processData: false
    })
);