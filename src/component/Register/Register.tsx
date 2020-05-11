import React, { Component } from 'react';
import {Prompt, Redirect} from 'react-router-dom';
import RegisterService from './RegisterService'
import { UserPersist } from '../Login/UserModel';

class Register extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            txtUserName: this.props.match.params.userName,
            txtFullName: null,
            txtEmail: null,
            isBlocking: false,
            isRedirectToSuccessPages: false,
            response: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitRegisterForm = this.handleSubmitRegisterForm.bind(this);
    }

    handleSubmitRegisterForm(event: any) {
        event.preventDefault();
        let user: UserPersist = {
            name: this.state.txtUserName,
            fullName: this.state.txtFullName,
            email: this.state.txtEmail,
        }
        RegisterService.registerUser(user)
            .then ((response: any) => {
                console.log(response);
                this.setState({
                    isRedirectToSuccessPages: true,
                    response: response
                })
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    handleInputChange(event: any) {
        this.setState({
            isBlocking: event.target.value.length > 0
        })
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        if(this.state.isRedirectToSuccessPages) {
            let pathName = "/registerSuccess/" + this.state.txtUserName;
            let data = this.state.response.data;
            return (<Redirect to={{
                pathname: pathName,
                state: {
                    response: data
                }
            }}/>);
        }
        const userName = this.props.match.params.userName;
        return (
            <div>
                <Prompt when={this.state.isBlocking} message={location => `Are you sure you want to go to ${location.pathname}`}/>
                <form onSubmit={(event) => this.handleSubmitRegisterForm(event)}>
                    <legend>Register Form For User: {userName}</legend>
                    <div className="form-group">
                        <label htmlFor="txtUserName">User Name</label>
                        <input onChange={(event) => this.handleInputChange(event)} type="text" className="form-control" name="txtUserName" placeholder="User Name" value={userName} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtFullName">Full Name</label>
                        <input onChange={(event) => this.handleInputChange(event)} type="text" className="form-control" name="txtFullName" placeholder="Full Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtEmail">Email</label>
                        <input onChange={(event) => this.handleInputChange(event)} type="email" className="form-control" name="txtEmail" placeholder="Email" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
           
        )
    }
}

export default Register;