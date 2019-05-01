import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';
import { Link, withRouter } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dropdown: "hide" };

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ dropdown: "hide" });
    }

    render() {
        if (this.props.user) {
            return (
                <header>
                    <Link className='logo' to='/'>ShutterStop</Link>
                    <div id='profile-dropdown'>
                        <div className="dropdown-button" onClick={this.handleDropdown}></div>
                        <ul className={this.state.dropdown} onClick={this.handleClick}>
                            <li className="hover-hightlight" onClick={() => this.props.history.push('/update')}>Update</li>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));