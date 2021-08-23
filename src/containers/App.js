import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute"
import { AuthProvider } from "../auth/AuthProvider";
import "../style/App.css";
import Home from "./Home";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import NavBar from "../components/NavBar";
import CardTable from "./CardTable";
import Status from "../components/Status";


const App = () => {
    return (
        <AuthProvider>
            <Router>
                    <PrivateRoute exact path="/" component={Home} />
                    <Route exact path="/" component={NavBar} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/game" component={NavBar} />
                    <Route exact path="/game" component={CardTable} />
                    <Route exact path="/status" component={NavBar} />
                    <Route exact path="/status" component={Status} />
            </Router>
        </AuthProvider>
    );
};

export default App;