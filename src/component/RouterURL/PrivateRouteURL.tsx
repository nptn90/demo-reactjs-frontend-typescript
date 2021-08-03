import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteURL = ({component, ...rest}: any) => (
    <Route {...rest} render={(props: any) =>(
        (sessionStorage.getItem('token')) 
        ? (React.createElement(component, props))
        :<Redirect to={{
            pathname: "/login",
            state: {from: props.location}
        }}/>
    )}/>
);

export default PrivateRouteURL;