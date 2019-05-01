import React from 'react';
import { connect } from 'react-redux';
import { signup, login } from '../actions/session_actions';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    handleUsername(e) {
        e.preventDefault();
        this.setState({ username: e.currentTarget.value });
    }

    handlePassword(e) {
        e.preventDefault();
        this.setState({ password: e.currentTarget.value });
    }

    renderErrors() {
        if (this.props.errors.length > 0) {
            return this.props.errors.map(error => <li>{error}</li>);
        } else {
            return "";
        }
    }

    render() {
        return (
            <div className='session-form'>
                <h1>{this.props.name === 'Sign up' ? 'Join ShutterStop' : 'Log In to ShutterStop'}</h1>
                <div id='form-main'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="Username">Username</label>
                        <input id="Username" type="text" value={this.state.username} onChange={this.handleUsername} />
                        <label htmlFor="Username">Password</label>
                        <input id="Password" type="password" value={this.state.password} onChange={this.handlePassword} />
                        <input className="submit-button" type="submit" value={this.props.name} />
                    </form>
                </div>
                <ul className="errors">{this.renderErrors()}</ul>
            </div>
        );
    }
}

const mstpSignup = state => ({
    name: "Sign up",
    errors: state.errors.login
});

const mdtpSignup = dispatch => ({
    processForm: user => dispatch(signup(user)),
    clearErrors: () => dispatch({type: 'NULL'})
});

const mstpLogin = state => ({
    name: "Log in",
    errors: state.errors.login
});

const mdtpLogin = dispatch => ({
    processForm: user => dispatch(login(user)),
    clearErrors: () => dispatch({ type: 'NULL' })
});

export const LoginForm = connect(mstpLogin, mdtpLogin)(SessionForm);
export const SignupForm = connect(mstpSignup, mdtpSignup)(SessionForm);