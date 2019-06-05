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
            <div className='splash-main-right'>
                <h3>The global network for photographers</h3>
                <h1>Discover and share the world’s best photos</h1>
                <p>Get inspired with incredible photos from diverse styles and genres around the world. We're not guided by fads—just great photography.</p>
                <Link id='signup-link-main' to='/signup'>Sign up</Link>
            </div>
        </div>
        <div className='splash-footer'>
            <ul>
                <li><a href="https://github.com/jrswanson/" className="fab fa-github"> <span>Github</span></a></li>
                <li><a href="https://www.linkedin.com/in/j-r-swanson/" className="fab fa-linkedin"> <span>LinkedIn</span></a></li>
                <li><a href="mailto:j.swanson.dev@gmail.com" className="far fa-envelope"> <span>Email</span></a></li>
            </ul>
        </div>
    </div>
);