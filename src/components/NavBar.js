import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const NavBar = () => {
    const { logout } = useContext(AuthContext);
     const handleSubmit = () => {
        logout();
    }

    return(
        <div id="navbar">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/game" exact>Game</NavLink>
            <NavLink to="/status" exact>Status</NavLink>
            <div id="logout">
                <button type="submit" onSubmit={handleSubmit}>Log Out</button>
            </div>
        </div>
    )
}

export default NavBar;