import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <div id="navbar">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/game" exact>Game</NavLink>
            <NavLink to="/status" exact>Status</NavLink>
        </div>
    )
}

export default NavBar;