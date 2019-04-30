import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    if (props.user) {
        return (
            <header>
                <div>ShutterStop 📸</div>
                <div id='leftNav'>
                    <div>Welcome, {props.user.username}</div>
                    <div><button onClick={props.logout}>Logout</button></div>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <div>ShutterStop 📸</div>
                <div id='leftNav'>
                    <div><Link className='loginLink' to='/login'>Login</Link></div>
                    <div><Link className='signupLink' to='/signup'>Sign Up</Link></div>
                </div>
            </header>
        );
    }
};

const mapStateToProps = ({ entities: { users }, session: { id } }) => ({
    user: id ? users[id] : null
});
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);