import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NavComponent: FC = () => {
    return (
        <div className="navbar">
            <ul className="nav navbar-nav">
                <li className="active">
                    <Link to="/">Home</Link>
                </li>
                <li className="active">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
}


export default NavComponent;