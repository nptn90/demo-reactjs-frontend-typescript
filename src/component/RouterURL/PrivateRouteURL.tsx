import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";



const PrivateRouteURL: React.FC<RouteProps> = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props: any) =>(
        (sessionStorage.getItem('token')) 
        ? (<React.Component<any, any> {...props}/>)
        :<Redirect to={{
            pathname: "/login",
            state: {from: props.location}
        }}/>
    )}/>
);

export default PrivateRouteURL;