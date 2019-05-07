import React from 'react';

const PhotoManagerItem = (props) => (
    <div className='photo-manager-box'>
        <img src={props.photo.photoURL}
            onClick={props.handlePhotoSelect}
            className={props.selected ? 'photo-item-selected' : ''}/>
    </div>
);

export default PhotoManagerItem;