import React, { useState } from "react";
import "../style/Home.css";
import NavBar from "../components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CardTable from "./CardTable";
import Status from "../components/Status";

const Home = () => {

    return (
        <div id="home">
            <Router>
                <Route path="/" component={NavBar} />
                <select id="category_selection">
                    <option>Action</option>
                    <option>Horror</option>
                </select>
                <p>This is a example of home</p>
                <button>START</button>
                <Route exact path="/game" component={CardTable} />
                <Route exact path="/status" component={Status} />
            </Router>
        </div>
    );
}

export default Home;