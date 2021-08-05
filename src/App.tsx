import React, { FC, useEffect } from 'react';
import RouterURLComponent from './component/RouterURL/RouterURLComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import NavComponent from './component/Nav/NavigationComponent';
import IntervalService from './component/commonService/IntervalService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './component/store'
import { Provider } from 'react-redux';

const intervalService: IntervalService = new IntervalService();

const App: FC = (props: any) => {

  useEffect(() => {
    restoreInterval()
  }, [])

  function restoreInterval() {
    console.log("restoreInterval");
    let token = sessionStorage.getItem('token');
    let tokenExpirationTime = sessionStorage.getItem('tokenExpirationTime');
    if (token && tokenExpirationTime) {
      intervalService.intervalRefreshToken(Number.parseInt(tokenExpirationTime));
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <NavComponent />
        <RouterURLComponent />
        <ToastContainer />
      </Router>
    </Provider>
  )
};

export default App;
