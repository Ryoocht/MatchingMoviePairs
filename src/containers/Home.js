import React from "react";
import "../style/Home.css";
import logo from "../img/movie-tickets.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {

    const [ genreId, setGenreId ] = useState(28);
    const handleChange = e => {
        setGenreId(e.target.value);
    }

    return (
        <div id="home">
            <div className="title-space">
                <div className="logoContainer">
                    <img className="movieicon" src={logo} alt="logo"></img>
                    <p className="main-title">Matching Movie</p>
                    <p className="main-title">Pairs</p>
                </div>
            </div>
            <div className="welcome-comment">
                <h3 className="welcome-title">Welcome to Matching Movie Pairs</h3>
                <p>How to play</p>
                <p className="left-side">
                Step 1 : Select your favourite movie genre.<br/>
                Step 2 : Press Start Button.<br/>
                Step 3 : Click and find right movie pairs.</p>
                <p>When you complete, you will see your score in status</p>
                <p>Enjoy!</p>
            </div>
            <div className="select-start">
                <label className="genreTxt" htmlFor="genres">Select a genre to play with</label>
                <div className="box">
                    <select onChange={handleChange}>
                        <option value="28">Action</option>
                        <option value="12">Adventure</option>
                        <option value="16">Animation</option>
                        <option value="35">Comedy</option>
                        <option value="80">Crime</option>
                        <option value="99">Documentary</option>
                        <option value="18">Drama</option>
                        <option value="10751">Family</option>
                        <option value="14">Fantasy</option>
                        <option value="36">History</option>
                        <option value="27">Horror</option>
                        <option value="10402">Music</option>
                        <option value="9648">Mystery</option>
                        <option value="10749">Romance</option>
                        <option value="878">Science</option>
                        <option value="878">Fiction</option>
                        <option value="53">Thriller</option>
                        <option value="10770">TV Movie</option>
                        <option value="10752">War</option>
                        <option value="37">Western</option>
                    </select>
                </div>
                <Link to={"/game/" + genreId} className="btn-gradient-3d-orange">START</Link>
            </div>
        </div>
    );
}

export default Home;