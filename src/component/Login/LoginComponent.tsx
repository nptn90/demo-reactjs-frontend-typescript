import React, { FC, useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginService from './LoginService'
import IntervalService from '../commonService/IntervalService'
import { UserLogin } from './UserModel';
import * as env from '../commonService/environmentHelper'
import { useDispatch } from 'react-redux'
import { changeAuth } from '../reducer/user-account-actions';

const loginService: LoginService = new LoginService();
const intervalService: IntervalService = new IntervalService();

const refreshToken = (expirationDate: number) => {
  intervalService.intervalRefreshToken(expirationDate);
}

let envValue = env.getEnvironmentValue('REACT_APP_HELLO_STRING');
console.log(envValue);

const LoginComponent: FC = (props: any) => {

  console.log("hello from login page")

  const [isRedirectToReffer, setIsRedirectToReffer] = useState(false);
  const [inputs, setInputs] = useState<InputForm>({
    userName: '',
    passWord: ''
  })

  const handleChangeInput = (event: any) => {
    const key = event.target.name;
    const value = event.target.value;
    setInputs({
      ...inputs,
      [key]: value
    })
  }

  const dispatch = useDispatch();

  const handleLogin = (event: any) => {
    event.preventDefault();
    const user: UserLogin = {
      passWord: inputs.passWord,
      userName: inputs.userName
    }

    loginService.login(user)
      .then((response: any) => {
        let token = response.data;

        dispatch(changeAuth({
          token: token.token,
          currentUser: user.userName
        }))
        sessionStorage.setItem('token', token.token);
        sessionStorage.setItem('tokenExpirationTime', token.expirationDate);

        refreshToken(token.expirationDate);
        setIsRedirectToReffer(true)
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const { from } = props.location.state || { from: { pathname: "/" } }

  const loginForm = (
    <form onSubmit={(event) => handleLogin(event)}>
      <div className="row">
        <div className="col-md-12 form-group">
          <input name="userName" type="text" onChange={(event) => handleChangeInput(event)} className="form-control" placeholder="Username" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 form-group">
          <input name="passWord" type="password" onChange={(event) => handleChangeInput(event)} placeholder="Enter your Password" className="form-control" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 form-group">
          <button type="submit" className="btn btn-block btn-login">Login</button>
        </div>
      </div>
    </form>)

  if (isRedirectToReffer) {
    return <Redirect to={from.pathname} />
  } else {
    return (
      <div className="simple-login-container">
        <h2>Login Form</h2>
        {loginForm}
      </div>
    );
  }
}

type InputForm = {
  userName: string
  passWord: string
}

export default LoginComponent;