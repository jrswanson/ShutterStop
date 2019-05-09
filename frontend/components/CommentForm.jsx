import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions/comments_actions';
import { fetchPhotoComments } from '../util/photos_api_util';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            body: '',
            photo_id: this.props.photo.id,
            textbox: '',
            comments: []
        };

        this.handleBody = this.handleBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetchPhotoComments(this.state.photo_id).then(res => {
            this.setState({ comments: res });
        });
    }

    handleBody(e) {
        e.preventDefault();
        this.setState({ body: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addComment(this.state).then(() => {
            return this.setState({ body: '' });
        }).then(() => {
            return fetchPhotoComments(this.state.photo_id);
        }).then(res => {
            return this.setState({ comments: res });
        });
    }

    convertDate(dateStr) {
        let dateObj = new Date(dateStr);
        dateObj = dateObj.toDateString().split(' ');
        return dateObj[1] + ' ' + dateObj[2];
    }

    renderName(comment) {
        let user = this.props.users[comment.commenter_id];
        return user.first_name + ' ' + user.last_name;
    }

    renderComment(comment) {
        if (comment.id) {
            return (
                <div key={comment.id} className='comments-list-item'>
                    <div className='comment-item-top'>
                        <div className='commenter-name'>
                            {this.renderName(comment)}
                        </div>
                        <div className='comment-date'>
                            {this.convertDate(comment.created_at)}
                        </div>
                    </div>
                    <div className='comment-body'>
                        {comment.body}
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }

    renderCommentForm() {
        if (this.props.loggedIn) {
            return (
                <>
                    <div className='comment-form'
                        id={this.state.textbox}>
                        <textarea
                            onSelect={() => this.setState({ textbox: 'comment-selected' })}
                            onBlur={() => this.setState({ textbox: '' })}
                            placeholder='Add a comment'
                            onChange={this.handleBody}
                            value={this.state.body}>
                        </textarea>
                        <div className='comment-form-icon'><div></div></div>
                    </div>
                    <div className='comment-submit-buttons'>
                        <div className='comment-cancel'
                            onClick={() => this.setState({ body: '' })}>Cancel</div>
                        <div className='comment-submit'
                            onClick={this.handleSubmit}>Comment</div>
                    </div>
                </>
            );
        } else {
            return '';
        }
    }

    render() {
        return (
            <div className='show-comments-container'>
                <div>{this.state.comments.length + ' Comments'}</div>
                {this.renderCommentForm()}
                <div className='comments-list'>
                    {this.state.comments.map(comment => this.renderComment(comment))}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addComment: comment => dispatch(addComment(comment))
});

export default connect(null, mapDispatchToProps)(CommentForm);