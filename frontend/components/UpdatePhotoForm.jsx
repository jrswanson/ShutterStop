import React from 'react';
import { connect } from 'react-redux';
import { fetchPhotos, updatePhoto, deletePhoto } from '../actions/photos_actions';
import categoryList from '../util/category_list';

class UpdatePhotoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.photo;

        this.handleTitle = this.handleTitle.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleKeywords = this.handleKeywords.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCover = this.handleCover.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.photo !== this.props.photo) {
            this.setState(this.props.photo);
        }
    }

    handleTitle(e) {
        e.preventDefault();
        this.setState({ title: e.currentTarget.value });
    }

    handleCategory(e) {
        e.preventDefault();
        this.setState({ category: e.currentTarget.value });
    }

    handleDescription(e) {
        e.preventDefault();
        this.setState({ description: e.currentTarget.value });
    }

    handleKeywords(e) {
        e.preventDefault();
        this.setState({ keywords: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updatePhoto(this.state);
    }

    handleDelete(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to permanently delete this photo? This action cannot be undone!')) {
            this.props.deletePhoto(this.state.id);
        }
    }

    handleCover() {
        if (this.state.id) {
            return '';
        } else {
            return 'update-form-cover';
        }
    }

    render () {
        return (
            <div className='update-photo-form'>
                <div className='info-photo-form'>
                    <h1>Edit your photo</h1>
                    <form>
                        <label htmlFor='title'>Title</label>
                        <input id='title'
                            type='text'
                            value={this.state.title}
                            onChange={this.handleTitle} />
                        <label htmlFor='category'>Category</label>
                        <select id='category'
                            value={this.state.category}
                            onChange={this.handleCategory}>
                            {this.props.categoryList.map((el, i) => <option key={i} value={el}>{el}</option>)}
                        </select>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id='description'
                            placeholder="Tell us more about your beautiful photo"
                            onChange={this.handleDescription}
                            value={this.state.description}>
                        </textarea>
                        <label htmlFor='keywords'>Keywords</label>
                        <textarea
                            id='keywords'
                            placeholder="Adding keywords helps your photo become more discoverable..."
                            onChange={this.handleKeywords}
                            value={this.state.keywords}>
                        </textarea>
                        <input
                            type='button'
                            onClick={this.handleDelete}
                            value='Delete this photo'
                            className='delete-button'>
                        </input>
                    </form>
                </div>
                <div className='submit-photo-form'>
                    <div
                        onClick={() => this.setState(this.props.photo)}
                        className='cancel-save'>Cancel</div>
                    <input
                        type='button'
                        onClick={this.handleSubmit}
                        value='Save'
                        className='submit-button'>
                    </input>
                </div>
                <div className={this.handleCover()}></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    categoryList: Object.freeze(categoryList)
});

const mapDispatchToProps = dispatch => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    updatePhoto: photo => dispatch(updatePhoto(photo)),
    deletePhoto: photoId => dispatch(deletePhoto(photoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePhotoForm);