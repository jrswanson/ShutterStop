import React from 'react';
import { connect } from 'react-redux';
import { clearModal } from '../actions/ui_actions';
import { uploadPhoto, receieveErrors } from '../actions/photos_actions';
import categoryList from '../util/category_list';

class NewPhotoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drag: 'drag-hide',
            photoFile: null,
            photoURL: '',
            title: '',
            category: 'Uncategorized',
            description: '',
            keywords: ''
        };

        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleKeywords = this.handleKeywords.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelUpload = this.handleCancelUpload.bind(this);
    }

    handleDragEnter(e) {
        e.preventDefault();
        this.setState({ drag: 'drag-modal' });
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.setState({ drag: 'drag-hide' });
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: 'drag-hide' });
        const file = e.dataTransfer.files[0];
        this.updateFileState(file);
    }

    handleFile(e) {
        e.preventDefault();
        const file = e.currentTarget.files[0];
        this.updateFileState(file);
    }

    updateFileState(file) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photoFile: file, photoURL: fileReader.result });
        };
        if (file.type === 'image/jpeg') {
            fileReader.readAsDataURL(file);
        } else {
            this.props.receieveErrors(['File type must be jpeg']);
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

        const formData = new FormData();

        formData.append('photo[photo]', this.state.photoFile);
        formData.append('photo[title]', this.state.title);
        formData.append('photo[category]', this.state.category);
        formData.append('photo[description]', this.state.description);
        formData.append('photo[keywords]', this.state.keywords);

        this.props.uploadPhoto(formData);
        this.props.clearModal();
    }

    handleCancelUpload() {
        this.setState({
            drag: 'drag-hide',
            photoFile: null,
            photoURL: '',
            title: '',
            category: 'Uncategorized',
            description: '',
            keywords: ''
        });
    }

    render() {
        if (this.state.photoFile) {
            return (
                <>
                    <div className='modal-background'
                        onClick={() => this.props.clearModal()}>
                        <div className='modal-child'
                            onClick={e => e.stopPropagation()}>
                            <div className='new-photo-pane'>
                                <div className='photo-preview-section'>
                                    <div className='preview-img-container'>
                                        <img src={this.state.photoURL}
                                            className='preview-img'/>
                                        <div id='preview-gradient'></div>
                                        <div id='close-preview'
                                            onClick={this.handleCancelUpload}>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-photo-form'>
                                    <div className='submit-photo-form'>
                                        <input
                                            type='button'
                                            onClick={this.handleSubmit}
                                            value='Submit'
                                            className='submit-button'>
                                        </input>
                                    </div>
                                    <div className='info-photo-form'>
                                        <form>
                                            <label htmlFor='title'>Title</label>
                                            <input id='title'
                                                type='text'
                                                value={this.state.title}
                                                onChange={this.handleTitle}/>
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
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={this.state.drag}
                        onDragOver={e => e.preventDefault()}
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleDrop}></div>
                    <div className='modal-background'
                        onDragEnter={this.handleDragEnter}
                        onClick={() => this.props.clearModal()}>
                        <div className='modal-child' onClick={e => e.stopPropagation()}>
                            <div className='select-photo'>
                                <label className='new-pic-button'>
                                    Select Photo
                                    <input type='file'
                                        onChange={this.handleFile}/>
                                </label>
                                <p>Or drag & drop a photo anywhere on this page</p>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = state => ({
    modal: state.ui.modal,
    categoryList: Object.freeze(categoryList)
});

const mapDispatchToProps = dispatch => ({
    clearModal: () => dispatch(clearModal()),
    uploadPhoto: photo => dispatch(uploadPhoto(photo)),
    receieveErrors: errors => dispatch(receieveErrors(errors))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPhotoForm);