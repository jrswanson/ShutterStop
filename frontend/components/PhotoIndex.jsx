import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/session_actions';
import { fetchPhotos } from '../actions/photos_actions';
import { fetchFollows } from '../actions/follows_actions';
import PhotoIndexItem from './PhotoIndexItem';

class PhotosIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = { fetchComplete: false };
    }

    componentDidMount() {
        this.props.fetchFollows().then(() => {
            return this.props.fetchUsers();
        }).then(() => {
            return this.props.fetchPhotos();
        }).then(() => {
            this.setState( { fetchComplete: true } );
        });
    }

    render() {
        if (this.state.fetchComplete) {
            return (<ul className='photos-index-container'>
                {Object.values(this.props.photos).map((ele) => <PhotoIndexItem key={ele.id} photo={ele} author={this.props.users[ele.user_id]}/>)}
            </ul>
            );
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => ({
    photos: state.entities.photos,
    users: state.entities.users,
    follows: state.entities.follows
});

const mapDispatchToProps = dispatch => ({
    fetchPhotos: () => dispatch(fetchPhotos()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFollows: () => dispatch(fetchFollows())
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotosIndex);