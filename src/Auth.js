import { Component } from "react";
import { Redirect } from "react-router";
import firebase from "./Firebase";
import { SpinnerComponent } from 'react-element-spinner';

class Auth extends Component {

    state = {
        signinCheck: false, //Check if login check is completed
        signedIn: false // Check if loged in already
    }

    isMounted = false; 

    componentDidMount = () => {
        this.isMounted = true;

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this.isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: true,
                    });
                }
            } else {
                if (this.isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: false,
                    });
                }
            }
        })
    }

    componentWillUnmount = () => {
        this.isMounted = false;
    }

    render() {
        //If check has not done yet
        if (!this.state.signinCheck) {
            return (
                <SpinnerComponent 
                loading={true}
                position={"global"}
                />
            );
        }
        // When check has done
        if (this.state.signedIn) {
            //Already signed in (display)
            return this.props.children;
        } else {
            // not sign in yet (redirect to login screen)
            return <Redirect to="/signin" />
        }
    }
}
export default Auth;