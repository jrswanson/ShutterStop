import React from 'react';
import Nav from './Nav';
import { SignupForm, LoginForm } from './SessionForm';
import { FirstLoginForm, UpdateUserForm } from './UpdateForm';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <div>
        <Nav/>
        <main>
            <ProtectedRoute path='/create-account' component={FirstLoginForm}/>
            <ProtectedRoute path='/update' component={UpdateUserForm} />
            <AuthRoute path='/signup' component={SignupForm} />
            <AuthRoute path='/login' component={LoginForm} />
        </main>
    </div>
);

export default App;