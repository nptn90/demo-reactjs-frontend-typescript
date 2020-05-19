import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginService from './LoginService'
import { AuthContext } from '../commonService/authenticationService';
import IntervalService from '../commonService/IntervalService'
import { UserLogin } from './UserModel';
import * as env from '../commonService/environmentHelper'

class LoginComponent extends Component<any, any> {

    loginService: LoginService = new LoginService();
    intervalService: IntervalService = new IntervalService();

    constructor(props: any) {
        super(props);
        this.state = {
            isRedirectToReffer: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            userName: null,
            passWord: null,
        }
    }

    handleChangeInput(event: any) {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    refreshToken(expirationDate: number) {
        this.intervalService.intervalRefreshToken(expirationDate);
    }

    handleLogin(event: any, context: any) {
        event.preventDefault();
        let user: UserLogin = {
            passWord: this.state.passWord,
            userName: this.state.userName
        }

        this.loginService.login(user)
        .then((response: any) => {
            let token = response.data;
            context.login(user.userName, token);
            sessionStorage.setItem('token', token.token);
            sessionStorage.setItem('tokenExpirationTime', token.expirationDate);
            this.refreshToken(token.expirationDate);
            context.displayToken();
            this.setState({
                isRedirectToReffer: true,
            })
        })
        .catch((error:any) => {
            console.log(error);
        });        
    }
    

    render() {

        const {isRedirectToReffer} = this.state;
        const {from} = this.props.location.state || {from: {pathname: "/"}}
        let envValue = env.getEnvironmentValue('REACT_APP_HELLO_STRING');
        console.log(envValue);

        if(isRedirectToReffer) {
            return <Redirect to={from.pathname}/>
        } else {
            return (
                <div className="simple-login-container">
                    <h2>Login Form</h2>
                    <AuthContext.Consumer>
                        {(context) => {
                            let loginFormElement = <form onSubmit={(event)=>this.handleLogin(event, context)}>
                                                        <div className="row">
                                                            <div className="col-md-12 form-group">
                                                                <input name="userName" type="text" onChange={(event) => this.handleChangeInput(event)} className="form-control" placeholder="Username" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12 form-group">
                                                                <input name="passWord" type="password" onChange={(event) => this.handleChangeInput(event)} placeholder="Enter your Password" className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12 form-group">
                                                                <button type="submit" className="btn btn-block btn-login">Login</button>
                                                            </div>
                                                        </div>
                                                    </form>
                             return loginFormElement;
                        }}
                    </AuthContext.Consumer>
                   
                </div>
                );
        }
    }
}

export default LoginComponent;