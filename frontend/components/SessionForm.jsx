import React from 'react';
import { connect } from 'react-redux';
import { signup, login } from '../actions/session_actions';
import { withRouter } from 'react-router-dom';

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
        this.handleDemo = this.handleDemo.bind(this);
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

    handleDemo(e) {
        e.preventDefault();

        let demoUsername = 'guest'.split('');
        let demoPassword = 'password'.split('');

        this.demoLogin(demoUsername, demoPassword);
    }

    demoLogin(username, password) {
        if (username.length > 0) {
            this.setState({username: this.state.username + username.shift()},
                () => window.setTimeout(() => this.demoLogin(username, password), 100));
        } else if (password.length > 0) {
            this.setState({ password: this.state.password + password.shift() },
                () => window.setTimeout(() => this.demoLogin(username, password), 100));
        } else {
            this.props.processForm(this.state);
        }
    }

    renderErrors() {
        if (this.props.errors.length > 0) {
            return this.props.errors.map(error => <li>{error}</li>);
        } else {
            return "";
        }
    }

    render() {
        let demoButton;
        if (this.props.name === "Log in") {
            demoButton = <input className="demo-button" type="button" value='Demo Log in' onClick={this.handleDemo}></input>;
        } else {
            demoButton = "";
        }
        return (
            <div className='user-form'>
                <h1>{this.props.name === 'Sign up' ? 'Join ShutterStop' : 'Log In to ShutterStop'}</h1>
                <div className='user-form-main'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="Username">Username</label>
                        <input id="Username" type="text" value={this.state.username} onChange={this.handleUsername} />
                        <label htmlFor="Password">Password</label>
                        <input id="Password" type="password" value={this.state.password} onChange={this.handlePassword} />
                        <input className="submit-button" type="submit" value={this.props.name} />
                        {demoButton}
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

export const LoginForm = withRouter(connect(mstpLogin, mdtpLogin)(SessionForm));
export const SignupForm = withRouter(connect(mstpSignup, mdtpSignup)(SessionForm));