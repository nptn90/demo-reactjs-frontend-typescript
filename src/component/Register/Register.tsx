import React, { FC, useEffect, useState } from 'react';
import { Prompt, Redirect } from 'react-router-dom';
import RegisterService from './RegisterService'
import { UserPersist } from '../Login/UserModel';

const Register: FC = (props: any) => {

  const [inputs, setInputs] = useState<InputForm>({
    txtUserName: props.match.params.userName,
    txtFullName: '',
    txtEmail: ''
  })
  const [isBlocking, setIsBlocking] = useState<boolean>(false)
  const [isRedirectToSuccessPages, setIsRedirectToSuccessPages] = useState<boolean>(false)
  const [response, setResponse] = useState<any>(null)

  const handleSubmitRegisterForm = (event: any) => {
    event.preventDefault();
    let user: UserPersist = {
      name: inputs.txtUserName,
      fullName: inputs.txtFullName,
      email: inputs.txtEmail,
    }

    RegisterService.registerUser(user)
      .then((response: any) => {
        console.log(response);
        setResponse(response)
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  const handleInputChange = (event: any) => {
    setIsBlocking(event.target.value.length > 0)
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  useEffect(() => {
    if(response) {
      setIsRedirectToSuccessPages(true)
    }
  }, [response])

  if (isRedirectToSuccessPages) {
    let pathName = "/registerSuccess/" + inputs.txtUserName;
    let data = response.data;
    return (<Redirect to={{
      pathname: pathName,
      state: {
        response: data
      }
    }} />);
  }
  const userName = props.match.params.userName;
  return (
    <div>
      <Prompt when={isBlocking} message={location => `Are you sure you want to go to ${location.pathname}`} />
      <form onSubmit={(event) => handleSubmitRegisterForm(event)}>
        <legend>Register Form For User: {userName}</legend>
        <div className="form-group">
          <label htmlFor="txtUserName">User Name</label>
          <input onChange={(event) => handleInputChange(event)} type="text" className="form-control" name="txtUserName" placeholder="User Name" value={userName} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="txtFullName">Full Name</label>
          <input onChange={(event) => handleInputChange(event)} type="text" className="form-control" name="txtFullName" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <label htmlFor="txtEmail">Email</label>
          <input onChange={(event) => handleInputChange(event)} type="email" className="form-control" name="txtEmail" placeholder="Email" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>

  )
}

type InputForm = {
  txtUserName: string
  txtFullName: string
  txtEmail: string
}

export default Register;