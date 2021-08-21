import React, { Component } from "react";
import firebase from "../Firebase";
import { Button } from "reactstrap";

class Home extends Component {

    handleLogout = () => {
        firebase.auth().signOut();
    }

    render(){
        return(
            <>
                <div className="container">
                    <p>Home</p>
                    <Button onClick={this.handleLogout}>Log Out</Button>
                </div>

                <div id="home">
                    <select id="category_selection">
                        <option>Action</option>
                        <option>Horror</option>
                    </select>
                    <p>This is a example of home</p>
                    <button>START</button>
                </div>
            </>
        )
    }
}

export default Home;