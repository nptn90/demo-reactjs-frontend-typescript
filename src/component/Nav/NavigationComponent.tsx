import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../reducer';
import { AuthState } from '../reducer/user';

const NavComponent: FC = () => {

  const auth: AuthState = useSelector((state: TReducers) => {
    return state.userReducer.authState
  });

  return (
    <div className="navbar">
      <ul className="nav navbar-nav">
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        <li className="active">
        {auth.currentUser ? <Link to="/#">{auth.currentUser}</Link> : <Link to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  );
}

export default NavComponent;