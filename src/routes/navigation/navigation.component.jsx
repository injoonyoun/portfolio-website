import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import './navigation.css';


const Navigation = () => {

    return (
        <Fragment>
            <header className="navbar">
                <ul>
                    <li><p className="nav-link"><a href='/'>HOME</a></p></li>
                    <li><p className="nav-link"><a href='/shop'>SHOP</a></p></li>
                    <li><p className="nav-link"><a href='/about'>ABOUT</a></p></li>
                </ul>
            </header>
            <Outlet />
        </Fragment>

    );
}


export default Navigation; 