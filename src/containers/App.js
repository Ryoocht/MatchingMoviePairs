import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute"
import { AuthProvider } from "../auth/AuthProvider";
import "../style/App.css";
import Home from "./Home";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </Switch>             
            </Router>
        </AuthProvider>
    );
};

export default App;