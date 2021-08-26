import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Auth.css";
import logo from "../img/movie-tickets.png";

const Login = ({ history }) => {
    const { login } = useContext(AuthContext);

    //Get login function from AuthContext
    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        login(email.value, password.value, history);
    };

    return (
        <div>
            <div className="login">
                <div className="logoContainer">
                    <img className="movieicon" src={logo} alt="logo"></img>
                    <p className="main-title">Matching Movie</p>
                    <p className="main-title">Pairs</p>
                </div>
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <label className="labels">Email</label>
                    <input name="email" type="email" placeholder="Email" />
                    <label className="labels">Password</label>
                    <input name="password" type="password" placeholder="Password" />
                    <button className="btn btn-primary btn-block btn-large" type="submit">Log in</button>
                </form>
                <button className="createBtn">
                    <Link to="/signup" className="createLink">Create Your New Account</Link>
                </button>
            </div>
        </div>
    );
};

export default withRouter(Login);