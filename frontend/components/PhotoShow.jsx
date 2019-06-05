import React from 'react';
import { connect } from 'react-redux';
import { fetchPhoto } from '../actions/photos_actions';
import { fetchUsers } from '../actions/session_actions';
import { fetchFollows } from '../actions/follows_actions';
import { fetchLikes } from '../actions/likes_actions';
import { followsUser } from '../util/follows_selectors';
import { likesPhoto, numLikes } from '../util/likes_selectors';
import { follow, unfollow } from '../actions/follows_actions';
import { like, unlike } from '../actions/likes_actions';
import CommentForm from './CommentForm';

class PhotoShow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            descriptionExpand: 'more',
            fetchDone: false
        };

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        this.props.fetchFollows().then(() => {
            return this.props.fetchLikes();
        }).then(() => {
            return this.props.fetchPhoto(this.props.match.params.photoId);
        }).then(() => {
            return this.props.fetchUsers();
        }).then(() => {
            this.setState({fetchDone: true});
        });
    }

    handleFollow(e) {
        e.preventDefault();
        this.props.follow(this.props.author.id);
    }

    handleUnfollow(e, followId) {
        e.preventDefault();
        this.props.unfollow(followId);
    }

    handleLike(e) {
        e.preventDefault();
        this.props.like(this.props.photo.id);
    }

    handleUnlike(e, likeId) {
        e.preventDefault();
        this.props.unlike(likeId);
    }

    handleToggle(e) {
        e.preventDefault();
        if (this.state.descriptionExpand === 'more') {
            this.setState({ descriptionExpand: 'less' });
        } else {
            this.setState({ descriptionExpand: 'more' });
        }
    }

    renderFollow() {
        if (!this.props.currentUserId) return '';

        let currFollow = followsUser(this.props.follows,
            this.props.currentUserId,
            this.props.author.id);

        if (this.props.currentUserId === this.props.author.id) {
            return '';
        } else if (currFollow) {
            return (
                <>
                    <div>·</div>
                    <div className='follow-button'
                        onClick={e => this.handleUnfollow(e, currFollow)}
                    >Unfollow</div>
                </>
            );
        } else {
            return (
                <>
                    <div>·</div>
                    <div className='follow-button'
                        onClick={this.handleFollow}
                    >Follow</div>
                </>
            );
        }
    }

    renderLike() {
        let currNum = numLikes(this.props.likes, this.props.photo.id);

        if (!this.props.currentUserId) {
            return (
                <div className='like-container'>
                    <div className='like-button'
                        onClick={() => this.props.history.push('/login')}></div>
                    <div>{currNum}</div>
                </div>
            );
        }

        let currLike = likesPhoto(this.props.likes,
            this.props.currentUserId,
            this.props.photo.id);

        if (currLike) {
            return (
                <div className='like-container'>
                    <div className='liked-button'
                        onClick={e => this.handleUnlike(e, currLike)}></div>
                    <div>{currNum}</div>
                </div>
            );
        } else {
            return (
                <div className='like-container'>
                    <div className='like-button'
                        onClick={this.handleLike}></div>
                    <div>{currNum}</div>
                </div>
            );
        }
    }

    renderDescription() {
        if (this.props.photo.description) {
            return (
                <div>
                    <p className={'description-' + this.state.descriptionExpand}>
                        {this.props.photo.description}
                    </p>
                    <div className='toggle-description'
                        onClick={this.handleToggle}>
                        {'Read ' + this.state.descriptionExpand}
                    </div>
                </div>
            );
        }
    }

    renderKeywords() {
        if (this.props.photo.keywords) {
            return (
                <div className='show-keywords'>
                    {this.props.photo.keywords.split(' ').map((keyword, index) => <div key={index} className='keyword-item'>{keyword}</div>)}
                </div>
            );
        }
    }

    render() {
        if (this.state.fetchDone) {
            return (
                <>
                    <div className='show-img-container' >
                        <img src={this.props.photo.photoURL} />
                    </div>
                    <div className='show-bottom-container'>
                        <div className='show-bottom-header'>
                            <div className='show-over-title'>
                                {this.renderLike()}
                            </div>
                            <div className='show-title'>{this.props.photo.title}</div>
                            <div className='show-under-title'>
                                <div>by</div>
                                <div
                                    className='show-author'>
                                    {`${this.props.author.first_name} ${this.props.author.last_name}`}
                                </div>
                                {this.renderFollow()}
                            </div>
                        </div>
                        <div className='show-bottom-main'>
                            {this.renderDescription()}
                            <div className='show-category'>
                                <div>Category</div>
                                {this.props.photo.category}
                            </div>
                            {this.renderKeywords()}
                        </div>
                        <CommentForm
                            photo={this.props.photo} 
                            comments={this.state.photoComments}
                            users={this.props.users}
                            loggedIn={Boolean(this.props.currentUserId)}
                            currentUserId={this.props.currentUserId} />
                    </div>
                </>
            );
        } else {
            return '';
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    let photo = state.entities.photos[ownProps.match.params.photoId];
    return ({
        photo: photo,
        author: photo ? state.entities.users[photo.user_id] : null,
        currentUserId: state.session.id,
        follows: state.entities.follows,
        likes: state.entities.likes,
        users: state.entities.users
    });
};

const mapDispatchToProps = dispatch => ({
    fetchFollows: () => dispatch(fetchFollows()),
    fetchLikes: () => dispatch(fetchLikes()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchPhoto: photoId => dispatch(fetchPhoto(photoId)),
    follow: followeeId => dispatch(follow(followeeId)),
    unfollow: followId => dispatch(unfollow(followId)),
    like: photoId => dispatch(like(photoId)),
    unlike: likeId => dispatch(unlike(likeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoShow);