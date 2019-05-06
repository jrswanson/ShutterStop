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

export const updatePhoto = photo => (
    $.ajax({
        method: 'PATCH',
        url: `/api/photos/${photo.id}`,
        data: { photo }
    })
);

export const deletePhoto = photoId => (
    $.ajax({
        method: 'DELETE',
        url: `/api/photos/${photoId}`
    })
);