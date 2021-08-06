import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginComponent from '../Login/LoginComponent';
import HomeComponent from '../Home/HomeComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import Detail from '../DetailComponent/Detail';
import Register from '../Register/Register';
import RegisterSuccess from '../ResigterSuccess/RegisterSuccess';
import PrivateRouteURL from './PrivateRouteURL';
import AdminPage from '../admin/Admin';
import { AuthState } from '../reducer/user';
import { useSelector } from 'react-redux';
import { TReducers } from '../reducer';

const RouterURLComponent: FC = () => {

  const auth: AuthState = useSelector((state: TReducers) => {
    return state.userReducer.authState
  })

  let routeList = null;

  if (auth && auth.currentUser === 'admin') {
    routeList = (
      <div>
        <Switch>
          <Route path="/" component={AdminPage}></Route>
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    )
  } else {
    routeList = (
      <div>
        <Switch>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/login" component={LoginComponent}></Route>
          <Route path="/register/:userName" component={Register} />
          <Route path="/registerSuccess/:userName" component={RegisterSuccess} />
          <PrivateRouteURL path="/detail/:cid" component={Detail} />
          <PrivateRouteURL path="/admin" component={AdminPage}></PrivateRouteURL>
          <Route component={NotFoundComponent} />
        </Switch>
      </div>
    )
  }

  return (routeList)
}


export default RouterURLComponent;