import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { followsUser } from '../util/follows_selectors';
import { likesPhoto, numLikes } from '../util/likes_selectors';
import { follow, unfollow } from '../actions/follows_actions';
import { like, unlike } from '../actions/likes_actions';

class PhotoIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loaded: 'photo-item-loading' };

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleUnlike = this.handleUnlike.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
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

    handleLoad() {
        this.setState({ loaded: 'loading-complete' });
    }

    convertDate(dateStr) {
        let dateObj = new Date(dateStr);
        return dateObj.toDateString().slice(4);
    }

    renderFollow() {
        if (!this.props.currentUserId) return '';

        let currFollow = followsUser(this.props.follows,
            this.props.currentUserId,
            this.props.author.id);

        if (this.props.photo.created_at) {
            return (
                <>
                    <div>·</div>
                    <div className='image-date'>
                        {this.convertDate(this.props.photo.created_at)}
                    </div>
                </>
            );
        } else if (this.props.currentUserId === this.props.author.id) {
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

    render() {
        return (
            <div className='photo-index-item'>
                <img src={this.props.photo.photoURL}
                    onClick={() => this.props.history.push(`/photos/${this.props.photo.id}`)}
                    onLoad={this.handleLoad}/>
                    <div className={this.state.loaded}></div>
                <div className='photo-index-bottom'>
                    <div className='photo-over-title'>
                        {this.renderLike()}
                    </div>
                    <div className='photo-title'>{this.props.photo.title}</div>
                    <div className='photo-under-title'>
                        <div>by</div>
                        <div
                            className='photo-author'>
                            {this.props.author ? `${this.props.author.first_name} ${this.props.author.last_name}` : ''}
                        </div>
                        {this.renderFollow()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUserId: state.session.id,
    follows: state.entities.follows,
    likes: state.entities.likes
});

const mapDispatchToProps = dispatch => ({
    follow: followeeId => dispatch(follow(followeeId)),
    unfollow: followId => dispatch(unfollow(followId)),
    like: photoId => dispatch(like(photoId)),
    unlike: likeId => dispatch(unlike(likeId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoIndexItem));