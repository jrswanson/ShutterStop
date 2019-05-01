import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { update } from '../actions/session_actions';

class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: 0, email: "", first_name: "", last_name: "" };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
        this.setState({id: (this.props.currentUser.id ? this.props.currentUser.id : "")});
        this.setState({email: (this.props.currentUser.email ? this.props.currentUser.email : "")});
        this.setState({first_name: (this.props.currentUser.first_name ? this.props.currentUser.first_name : "")});
        this.setState({last_name: (this.props.currentUser.last_name ? this.props.currentUser.last_name : "")});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state).then(() => {
            this.props.history.push('/');
        });
    }

    handleEmail(e) {
        e.preventDefault();
        this.setState({ email: e.currentTarget.value });
    }

    handleFirst(e) {
        e.preventDefault();
        this.setState({ first_name: e.currentTarget.value });
    }

    handleLast(e) {
        e.preventDefault();
        this.setState({ last_name: e.currentTarget.value });
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
                <h1>{this.props.name === 'first' ? "Welcome to ShutterStop. Let's get to know you a little." : 'Update your information.'}</h1>
                <div id='form-main'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="Email">Email</label>
                        <input id="Email" type="email" value={this.state.email} onChange={this.handleEmail} />
                        <label htmlFor="First name">First name</label>
                        <input id="First name" type="text" value={this.state.first_name} onChange={this.handleFirst} />
                        <label htmlFor="Last name">Last name</label>
                        <input id="Last name" type="text" value={this.state.last_name} onChange={this.handleLast} />
                        <input className="submit-button"
                            type="submit"
                            value={this.props.name === 'first' ? "Finish account" : 'Update'} />
                    </form>
                </div>
                <ul className="errors">{this.renderErrors()}</ul>
            </div>
        );
    }
}

const mstpFirst = state => ({
    name: "first",
    errors: state.errors.login,
    currentUser: state.entities.users[state.session.id]
});

const mapStateToProps = state => ({
    name: "update",
    errors: state.errors.login,
    currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(update(user)),
    clearErrors: () => dispatch({ type: 'NULL' })
});

export const FirstLoginForm = withRouter(connect(mstpFirst, mapDispatchToProps)(UpdateForm));
export const UpdateUserForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateForm));