import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: "hide" };

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleDropdown(e) {
        e.preventDefault();
        if (this.state.dropdown === "hide") {
            this.setState({ dropdown: "show" });
        } else {
            this.setState({ dropdown: "hide" });
        }
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logout();
        this.setState({ dropdown: "hide" });
    }

    render() {
        if (this.props.user) {
            return (
                <header>
                    <Link className='logo' to='/'>ShutterStop</Link>
                    <div id='profile-dropdown'>
                        <div className="dropdown-button" onClick={this.handleDropdown}></div>
                        <ul className={this.state.dropdown}>
                            <li>Welcome, {this.props.user.username}</li>
                            <li className="hover-hightlight" onClick={this.handleLogout}>Logout</li>
                        </ul>
                    </div>
                </header>
            );
        } else {
            return (
                <header>
                    <Link className='logo' to='/'>ShutterStop</Link>
                    <div className='left-nav'>
                        <Link id='login-link' to='/login'>Log in</Link>
                        <Link id='signup-link' to='/signup'>Sign up</Link>
                    </div>
                </header>
            );
        }
    }
}

const mapStateToProps = ({ entities: { users }, session: { id } }) => ({
    user: id ? users[id] : null
});
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);