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
            return this.props.errors.join(", ");
        } else {
            return "";
        }
    }

    render() {
        return (
            <>
                <h2>{this.props.name}</h2>
                <form onSubmit={this.handleSubmit}>
                    Username:
                    <input type="text" value={this.state.username} onChange={this.handleUsername} />
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePassword} />
                    <input type="submit" value={this.props.name} />
                </form>
                <div className="errors">{this.renderErrors()}</div>
            </>
        );
    }
}
const mstpSignup = state => ({
    name: "Sign Up",
    errors: state.errors.login
});
const mdtpSignup = dispatch => ({
    processForm: user => dispatch(signup(user))
});
const mstpLogin = state => ({
    name: "Login",
    errors: state.errors.login
});
const mdtpLogin = dispatch => ({
    processForm: user => dispatch(login(user))
});
export const LoginForm = connect(mstpLogin, mdtpLogin)(SessionForm);
export const SignupForm = connect(mstpSignup, mdtpSignup)(SessionForm);