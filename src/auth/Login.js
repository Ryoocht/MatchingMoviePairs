import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import "../style/Auth.css";

const Login = ({ history }) => {
    const { login } = useContext(AuthContext);

    //Get login function from AuthContext
    const handleSubmit = event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        login(email.value, password.value, history);
    };

    return (
        <div className="login-page animate">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>LOGIN</h3>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label for="email"><b>Email</b></label>
                            <input name="email" type="email" placeholder="Email" />
                        <label for="password"><b>Password</b></label>
                            <input name="password" type="password" placeholder="Password" />
                        <button type="submit">Log in</button>
                    </form>
                    <Link to="/signup">Create your account here</Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);