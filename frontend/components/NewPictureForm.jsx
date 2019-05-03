import React from 'react';
import { connect } from 'react-redux';
import { clearModal } from '../actions/ui_actions';

class NewPictureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drag: 'drag-hide',
            photoFile: null
        };

        this.closeModal = this.closeModal.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    closeModal(e) {
        this.props.clearModal();
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
        this.setState({ photoFile: e.dataTransfer.files[0] });
    }

    handleFile(e) {
        e.preventDefault();
        this.setState({ photoFile: e.currentTarget.files[0] });
    }

    render() {
        if (this.state.photoFile) {
            return (
                <>
                    <div className='modal-background'
                        onClick={this.closeModal}>
                        <div className='modal-child' onClick={e => e.stopPropagation()}>
                            <form className='new-pic-form'>
                                <label htmlFor='title'>Title</label>
                                <input id='title' type='text' />
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    id='description'
                                    placeholder="Tell us more about your beautiful photo">
                                </textarea>
                            </form>
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
                        onClick={this.closeModal}>
                        <div className='modal-child' onClick={e => e.stopPropagation()}>
                            <div className='select-photo'>
                                <label className='new-pic-button'>
                                    Select Photo
                                    <input type='file'
                                        onChange={this.handleFile}/>
                                </label>
                                <p>Or drag & drop photos anywhere on this page</p>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
}

const mapStateToProps = state => ({
    modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
    clearModal: () => dispatch(clearModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPictureForm);