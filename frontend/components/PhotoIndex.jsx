import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/session_actions';
import { fetchPhotos } from '../actions/photos_actions';
import { fetchFollows } from '../actions/follows_actions';
import { fetchFollowedPhotos } from '../util/user_api_util';
import { fetchLikes } from '../actions/likes_actions';
import { fetchComments } from '../actions/comments_actions';
import PhotoIndexItem from './PhotoIndexItem';

class PhotosIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchComplete: false,
            followedPhotos: []
        };
    }

    componentDidMount() {
        this.props.fetchFollows().then(() => {
            return this.props.fetchUsers();
        }).then(() => {
            return this.props.fetchPhotos();
        }).then(() => {
            return this.props.fetchLikes();
        }).then(() => {
            return this.props.fetchComments();
        }).then(() => {
            return fetchFollowedPhotos();
        }).then(res => {
            return this.setState({ followedPhotos: res.reverse() });
        }).then(() => {
            this.setState({ fetchComplete: true });
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.follows !== this.props.follows) {
            fetchFollowedPhotos().then(res => {
                this.setState({ followedPhotos: res.reverse() });
            });
        } else if (!this.props.currentUserId && this.state.followedPhotos.length > 0) {
            this.setState({ followedPhotos: [] });
        }
    }

    renderFeed() {
        if (this.state.followedPhotos.length > 0) {
            return (
                <>
                    <h1>Your feed</h1>
                    <div className='followed-photos-index-container'>
                        {this.state.followedPhotos.map((ele) => <PhotoIndexItem key={ele.id} photo={ele} author={this.props.users[ele.user_id]} />)}
                    </div>
                </>
            );
        } else {
            return '';
        }
    }

    render() {
        if (this.state.fetchComplete) {
            return (
                <div className='photos-index-pane'>
                    <h1>Recent photos</h1>
                    <div className='all-photos-index-container'>
                        <ul>
                            {Object.values(this.props.photos).map((ele) => <PhotoIndexItem key={ele.id} photo={ele} author={this.props.users[ele.user_id]}/>)}
                        </ul>
                    </div>
                    {this.renderFeed()}
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => ({
    currentUserId: state.session.id,
    photos: state.entities.photos,
    users: state.entities.users,
    follows: state.entities.follows,
    comments: state.entities.comments
});

const mapDispatchToProps = dispatch => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFollows: () => dispatch(fetchFollows()),
    fetchLikes: () => dispatch(fetchLikes()),
    fetchComments: () => dispatch(fetchComments())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosIndex);