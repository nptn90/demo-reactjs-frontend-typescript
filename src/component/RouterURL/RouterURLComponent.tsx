import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom';
import LoginComponent from '../Login/LoginComponent';
import HomeComponent from '../Home/HomeComponent';
import NotFoundComponent from '../NotFound/NotFoundComponent';
import Detail from '../DetailComponent/Detail';
import Register from '../Register/Register';
import RegisterSuccess from '../ResigterSuccess/RegisterSuccess';
import PrivateRouteURL from './PrivateRouteURL';

class RouterURLComponent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomeComponent}></Route>
                    <Route path="/login" component={LoginComponent}></Route>
                    <Route path="/register/:userName" component={Register}/>
                    <Route path="/registerSuccess/:userName" component={RegisterSuccess}/>
                    <PrivateRouteURL path="/detail/:cid" component={Detail}/>
                    
                    <Route component={NotFoundComponent}/>
                </Switch>
            </div>
        );
    }
}


export default RouterURLComponent;