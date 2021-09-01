import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Home.css";

const NavBar = () => {
    const { logout } = useContext(AuthContext);
    const handleSubmit = () => {
        logout();
    }

    return (
        <div className="navbar">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/game" exact>Game</NavLink>
            <NavLink to="/status" exact>Status</NavLink>
            <button className="btn" type="submit" onClick={handleSubmit}>Log Out</button>
        </div>
    )
}

export default NavBar;