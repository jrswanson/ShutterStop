import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    if (props.user) {
        return (
            <header>
                <Link className='logo' to='/'>ShutterStop</Link>
                <div id='leftNav'>
                    <div>Welcome, {props.user.username}</div>
                    <div><button onClick={props.logout}>Logout</button></div>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <Link className='logo' to='/'>ShutterStop</Link>
                <div className='leftNav'>
                    <Link id='loginLink' to='/login'>Log in</Link>
                    <Link id='signupLink' to='/signup'>Sign up</Link>
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