import React from 'react';
import { connect } from 'react-redux';
import UpdatePhotoForm from './UpdatePhotoForm';
import PhotoManagerItem from './PhotoManagerItem';
import { fetchPhotos } from '../actions/photos_actions';
import { newPhotoModal } from '../actions/ui_actions';
import { userPhotosSelector } from '../util/photos_selectors';

class PhotoManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {selectedPhoto: null};
        this.handleNewPhoto = this.handleNewPhoto.bind(this);
        this.handlePhotoSelect = this.handlePhotoSelect.bind(this);
        this.handlePhotoDeselect = this.handlePhotoDeselect.bind(this);
    }

    componentDidMount() {
        this.props.fetchPhotos();
    }

    handleNewPhoto(e) {
        e.preventDefault();
        this.props.newPhotoModal();
    }

    renderUpdateForm() {
        if (this.state.selectedPhoto) {
            return <UpdatePhotoForm photo={this.state.selectedPhoto} />;
        } else {
            return <UpdatePhotoForm photo={{id: null, title: '', category: 'Uncategorized', description: '', keywords: '' }} />;
        }
    }

    handlePhotoSelect(e, photo) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ selectedPhoto: photo });
    }

    handlePhotoDeselect(e) {
        e.preventDefault();
        this.setState({ selectedPhoto: null });
    }

    render() {
        return (
            <div className='manager-pane'>
                <div className='photo-selection-pane' onClick={this.handlePhotoDeselect}>
                    <div className='photo-selection-head'>
                        <input
                        type='button'
                        className='add-to-library-button'
                        onClick={this.handleNewPhoto}
                        value='Upload to Library'>
                        </input>
                    </div>
                    <div className='photo-selector'>
                        <ul>
                            {this.props.userPhotos.map(el => <PhotoManagerItem key={el.id} selected={this.state.selectedPhoto === el} photo={el} handlePhotoSelect={e => this.handlePhotoSelect(e, el)}/>)}
                        </ul>
                    </div>
                </div>
                {this.renderUpdateForm()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    photos: state.entities.photos,
    userPhotos: userPhotosSelector(state)
});

const mapDispatchToProps = dispatch => ({
    newPhotoModal: () => dispatch(newPhotoModal()),
    fetchPhotos: () => dispatch(fetchPhotos())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoManager);