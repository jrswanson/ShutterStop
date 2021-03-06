import React from 'react';
import Nav from './Nav';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { SignupForm, LoginForm } from './SessionForm';
import { FirstLoginForm, UpdateUserForm } from './UpdateForm';
import Splash from './Splash';
import NewPhotoForm from './NewPhotoForm';
import PhotoManager from './PhotoManager';
import PhotoIndex from './PhotoIndex';
import PhotoShow from './PhotoShow';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

class App extends React.Component {
    render () {
        if (this.props.finishAccount) {
            return (
                <div>
                    <Nav />
                    <main>
                        <Route to='/' component={FirstLoginForm} />
                    </main>
                </div>
            );
        } else {
            return (
                <div>
                    {this.props.modal === "new photo" ? <NewPhotoForm/> : ''}
                    <Nav />
                    <main>
                        <Switch>
                            <ProtectedRoute path='/update' component={UpdateUserForm} />
                            <ProtectedRoute path='/photos/manage' component={PhotoManager} />
                            <ProtectedRoute path='/photos/:photoId' component={PhotoShow} />
                            <ProtectedRoute path='/discover' component={PhotoIndex} />
                            <AuthRoute path='/signup' component={SignupForm} />
                            <AuthRoute path='/login' component={LoginForm} />
                            <AuthRoute exact path='/' component={Splash} />
                        </Switch>
                    </main>
                </div>
            );
        }
    }  
}

const mapStateToProps = state => {
    let bool;
    if (state.session.id) {
        let currentUser = state.entities.users[state.session.id];
        bool = Boolean(!currentUser.email || !currentUser.first_name || !currentUser.last_name);
    } else {
        bool = false;
    }
    return {finishAccount: bool, modal: state.ui.modal};
};

export default connect(mapStateToProps)(App);