import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
    <div id='splash'>
        <header>
            <Link className='logo' to='/'>ShutterStop</Link>
            <div className='right-nav'>
                <Link id='login-link-splash' to='/login'>Log in</Link>
                <Link id='signup-link-splash' to='/signup'>Sign up</Link>
            </div>
        </header>
        <img src="./assets/wave.svg" alt="" id='wave'/>
        <main>
            <img src="./assets/splash.jpg" alt="" id='splash-img'/>
            <div></div>
        </main>
    </div>
);