import React from 'react';
import { connect } from 'react-redux';
import { clearModal } from '../actions/ui_actions';

class NewPictureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { drag: 'drag-hide' };

        this.closeModal = this.closeModal.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
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
    }

    render() {
        return (
            <>
                <div className={this.state.drag}
                    onDragOver={e => e.preventDefault()}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}></div>
                <div className='modal-background'
                    onDragEnter={this.handleDragEnter}
                    onClick={this.closeModal}>
                    <div className='modal-child' onClick={e => e.stopPropagation()}></div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
    clearModal: () => dispatch(clearModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPictureForm);