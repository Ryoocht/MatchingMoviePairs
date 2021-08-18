import { Component  } from "react";
import { 
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import "../style/App.css";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import CardTable from "./CardTable";
import Status from "../components/Status";


class App extends Component {

    render(){
        return(
            <Router>
                <div>
                    <NavBar />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/game" component={CardTable} />
                    <Route exact path="/status" component={Status} />
                </div>
            </Router>
        )
    }
}

export default App;