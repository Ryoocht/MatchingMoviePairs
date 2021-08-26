import React, { useContext } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../style/Auth.css";
import logo from "../img/movie-tickets.png";

const SignUp = ({ history }) => {
  const { signup } = useContext(AuthContext);
  //Get signup function from AuthContext
  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signup(email.value, password.value, history);
  };

  return (
    <div>
      <div className="login">
        <div className="logoContainer">
          <img className="movieicon" src={logo} alt="logo"></img>
          <p className="main-title">Matching Movie</p>
          <p className="main-title">Pairs</p>
        </div>
        <h1>SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <label className="labels">Email</label>
          <input name="email" type="email" placeholder="Email" />
          <label className="labels">Password</label>
          <input name="password" type="password" placeholder="Password" />
          <button className="btn btn-primary btn-block btn-large" type="submit">Sign Up</button>
        </form>
        <button className="createBtn">
          <Link to="/login" className="createLink">Go back to Login</Link>
        </button>
      </div>
    </div>
  );
};

export default withRouter(SignUp);