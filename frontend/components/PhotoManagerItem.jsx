import React from 'react';

const PhotoManagerItem = (props) => (
    <div className='photo-box'>
        <img src={props.photo.photoURL}
            onClick={props.handlePhotoSelect}
            className={props.selected ? 'photo-item-selected' : ''}/>
    </div>
);

export default PhotoManagerItem;