import React from 'react';
import Nav from './Nav';
import { SignupForm, LoginForm } from './SessionForm';
import AuthRoute from '../util/route_util';

const App = () => (
    <div>
        <Nav/>

        <AuthRoute path='/signup' component={SignupForm} />
        <AuthRoute path='/login' component={LoginForm} />
    </div>
);

export default App;