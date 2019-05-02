import React from 'react';
import { connect } from 'react-redux';
import { fetchPhotos } from '../actions/photos_actions';

class PhotosIndex extends React.Component {
    componentDidMount() {
        this.props.fetchPhotos();
    }

    render() {
        return (<ul className='photos-container'>
            {Object.values(this.props.photos).map((ele) => <img key={ele.id} className='indexPhoto' src={ele.photoURL}/>)}
        </ul>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.entities.photos
});

const mapDispatchToProps = dispatch => ({
    fetchPhotos: () => dispatch(fetchPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosIndex);