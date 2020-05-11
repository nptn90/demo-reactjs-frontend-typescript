import React, { Component } from 'react';
import RouterURLComponent from './component/RouterURL/RouterURLComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import NavComponent from './component/Nav/NavigationComponent';
import AuthenticationProvider from './component/commonService/authenticationService';
import IntervalService from './component/commonService/IntervalService'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  intervalService: IntervalService = new IntervalService();

  componentDidMount() {
    this.restoreInterval();
  }

  restoreInterval() {
    console.log("restoreInterval");
    let token = sessionStorage.getItem('token');
    let tokenExpirationTime = sessionStorage.getItem('tokenExpirationTime');
    if(token && tokenExpirationTime) {
      this.intervalService.intervalRefreshToken(Number.parseInt(tokenExpirationTime));
    }
  }

  render() {
    return (
      <AuthenticationProvider>
        <Router>
          <NavComponent/>
          <RouterURLComponent/>
          <ToastContainer />
        </Router>
      </AuthenticationProvider>
    )  
  };
};

export default App;
