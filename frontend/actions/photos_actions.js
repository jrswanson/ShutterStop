import * as APIUtils from '../util/photos_api_util';

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export const RECEIVE_PHOTO = 'RECEIVE_PHOTO';
export const REMOVE_PHOTO = 'REMOVE_PHOTO';
export const RECEIVE_PHOTO_ERRORS = 'RECEIVE_PHOTO_ERRORS';

export const receievePhotos = photos => ({
    type: RECEIVE_PHOTOS,
    photos
});

export const receievePhoto = photo => ({
    type: RECEIVE_PHOTO,
    photo
});

export const removePhoto = photoId => ({
    type: REMOVE_PHOTO,
    photoId
});

export const receieveErrors = (errors) => ({
    type: RECEIVE_PHOTO_ERRORS,
    errors
});

export const fetchPhotos = () => dispatch => (
    APIUtils.fetchPhotos()
        .then(res => dispatch(receievePhotos(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const fetchPhoto = photoId => dispatch => (
    APIUtils.fetchPhoto(photoId)
        .then(res => dispatch(receievePhoto(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const uploadPhoto = photo => dispatch => (
    APIUtils.uploadPhoto(photo)
        .then(res => dispatch(receievePhoto(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const updatePhoto = photo => dispatch => (
    APIUtils.updatePhoto(photo)
        .then(res => dispatch(receievePhoto(res)))
        .fail(errors => dispatch(receieveErrors(errors)))
);

export const deletePhoto = photoId => dispatch => (
    APIUtils.deletePhoto(photoId)
        .then(() => dispatch(removePhoto(photoId)))
        .fail(errors => dispatch(receieveErrors(errors)))
);