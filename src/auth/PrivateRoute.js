import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./Login";

const PrivateRoute = ({ component, ...rest }) => {
    //Get currentUser from AuthContext
    const { currentUser } = useContext(AuthContext);
    //When currentUser return true then component = Home
    //If return value is false then jump to Login component
    const Component = currentUser ? component : Login;
    return <Route {...rest} currentUser={currentUser} component={Component} />;
};

export default PrivateRoute;