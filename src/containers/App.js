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
import RecordTable from "../containers/RecordTable";


const App = () => {
    return (
        <AuthProvider>
            <RecordProvider>
                <Router basename="/MatchingMoviePairs">
                    <NavBar />
                        <PrivateRoute exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route path="/game" component={CardTable} />
                        <Route exact path="/status" component={RecordTable} />
                </Router>
            </RecordProvider>
        </AuthProvider>
    );
};

export default App;