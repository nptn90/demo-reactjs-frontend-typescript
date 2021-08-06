import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TReducers } from '../reducer';
import { AuthState } from '../reducer/user';
import { changeAuth } from '../reducer/user-account-actions';

const NavComponent: FC = () => {

  const auth: AuthState = useSelector((state: TReducers) => {
    return state.userReducer.authState
  });

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(changeAuth({
      token: '',
      currentUser: ''
    }))
  }

  let subNav = null

  if (auth?.currentUser) {
    subNav = (
      <>
        <li className="active">
          <Link to="/#">{auth.currentUser}</Link>
        </li>
        <li className="active" onClick={handleLogout}>
          <Link to="/#">Logout</Link>
        </li>
      </>
    )
  } else {
    subNav = (
      <li className="active">
        <Link to="/login">Login</Link>
      </li>
    )
  }

  return (
    <div className="navbar">
      <ul className="nav navbar-nav">
        <li className="active">
          <Link to="/">Home</Link>
        </li>
        {subNav}
      </ul>
    </div>
  );
}

export default NavComponent;