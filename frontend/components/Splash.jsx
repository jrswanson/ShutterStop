import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
    <div className='splash'>
        <div className='splash-nav'>
            <Link className='logo' to='/'>ShutterStop</Link>
            <div className='right-nav'>
                <Link id='login-link-splash' to='/login'>Log in</Link>
                <Link id='signup-link-splash' to='/signup'>Sign up</Link>
            </div>
        </div>
        <img src="./assets/wave.svg" alt="" className='wave'/>
        <div className='splash-white'></div>
        <div className='splash-main'>
            <img src="./assets/splash.jpg" alt="" className='splash-img'/>
            <div></div>
        </div>
        <div className='splash-footer'>
            <ul>
                <li><a href="https://github.com/jrswanson/" class="icon style2 fa-github"><span class="label">Github</span></a></li>
                <li><a href="https://www.linkedin.com/in/j-r-swanson/" class="icon style2 fa-linkedin"><span class="label">LinkedIn</span></a></li>
                <li><a href="mailto:j.swanson.dev@gmail.com" class="icon style2 fa-envelope"><span class="label">Email</span></a></li>
            </ul>
        </div>
    </div>
);