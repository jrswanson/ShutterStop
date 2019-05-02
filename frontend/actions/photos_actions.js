import * as APIUtils from '../util/photos_api_util';

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export const RECEIVE_PHOTO = 'RECEIVE_PHOTO';
export const RECEIVE_PHOTO_ERRORS = 'RECEIVE_PHOTO_ERRORS';

export const receievePhotos = (photos) => ({
    type: RECEIVE_PHOTOS,
    photos
});

export const receievePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo
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