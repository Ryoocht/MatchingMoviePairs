import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "../auth/PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { RecordProvider } from "../contexts/RecordContext";
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
            <RecordProvider>
                <Router>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exact path="/" component={NavBar} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route path="/game" component={NavBar} />
                        <Route path="/game" component={CardTable} />
                        <Route exact path="/status" component={NavBar} />
                        <Route exact path="/status" component={Status} />
                </Router>
            </RecordProvider>
        </AuthProvider>
    );
};

export default App;