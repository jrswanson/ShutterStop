import React from 'react';
import { connect } from 'react-redux';
import { followsUser } from '../util/follows_selectors';
import { follow, unfollow } from '../actions/follows_actions';

class PhotoIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
    }

    handleFollow(e) {
        e.preventDefault();
        this.props.follow(this.props.author.id);
    }

    handleUnfollow(e, followId) {
        e.preventDefault();
        this.props.unfollow(followId);
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



    render() {
        return (
            <div className='photo-index-item'>
                <img src={this.props.photo.photoURL} />
                <div className='photo-index-bottom'>
                    <div className='photo-title'>{this.props.photo.title}</div>
                    <div className='photo-under-title'>
                        <div>by</div>
                        <div>{this.props.author ? `${this.props.author.first_name} ${this.props.author.last_name}` : ''}</div>
                        {this.renderFollow()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUserId: state.session.id,
    follows: state.entities.follows
});

const mapDispatchToProps = dispatch => ({
    follow: followeeId => dispatch(follow(followeeId)),
    unfollow: followId => dispatch(unfollow(followId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoIndexItem);