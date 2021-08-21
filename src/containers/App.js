import { Component  } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from '../Firebase';
import "../style/App.css";
import Home from "../screens/Home";
import SignInOrUp from "../screens/SignInOrUp";
import SignUp from "../screens/SignUp";
import NavBar from "../components/NavBar";
import CardTable from "./CardTable";
import Status from "../components/Status";
import Auth from "../Auth";


class App extends Component {
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/signin" component={SignInOrUp} />
                    <Route exact path="/signup" component={SignUp} />
                    <Auth>
                        <NavBar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/game" component={CardTable} />
                        <Route exact path="/status" component={Status} />
                        <Route render={() => <p>not found.</p>} />
                    </Auth>
                </Switch>
            </Router>
        )
    }
}

export default App;