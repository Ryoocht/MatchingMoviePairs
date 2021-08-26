import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";

const PrivateRoute = ({ component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);
    //When currentUser return true then component = Home
    //If return value is false then jump to Login component
    const Component = currentUser ? component : Login;

    return <Route {...rest} component={Component} />;
};

export default PrivateRoute;