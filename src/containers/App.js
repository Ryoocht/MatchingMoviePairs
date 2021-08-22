import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute"
import { AuthProvider } from "../auth/AuthProvider";
import "../style/App.css";
import Home from "../components/Home";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import NavBar from "../components/NavBar";
import CardTable from "./CardTable";
import Status from "../components/Status";


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <PrivateRoute exact path="/" component={Home} />
                    <NavBar />
                    <Route exact path="/game" component={CardTable} />
                    <Route exact path="/status" component={Status} />
                    <Route render={() => <p>not found.</p>} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;