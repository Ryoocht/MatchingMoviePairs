import React from "react";
import "../style/Home.css";

const Home = () => {

    return (
        <div id="home">
            <select id="category_selection">
                <option>Action</option>
                <option>Horror</option>
            </select>
            <p>This is a example of home</p>
            <button>START</button>
        </div>
    );
}

export default Home;