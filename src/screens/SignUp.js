import { Component  } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter  } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../Firebase";

class SignUp extends Component {
    state = {
        loading: false // For a spinner
    }

    isMounted = false;

    // Submited
    handleSubmit = values => {
        //display spinner
        if(this.isMounted){
            this.setState({loading: true});
        }
        firebase.auth().createUserWithEmailAndPassword(values.email, values.passward)
            .then(resp => {
                //Working propery then stop displaying spinner
                if(this.isMounted){
                    this.setState({loading: false});
                }
                this.props.history.push("/"); // Using withRouter to do history.push
            })
            .catch(err => {
                if(this.isMounted){
                    this.setState({loading: false});
                    alert(err);
                }
            });
    }

    componentDidMount = () => {
        this.isMounted = true;
    }

    componentWillUnmount = () => {
        this.isMounted = false;
    }

    render(){
        return(
            <div className="container">
                <div className="mx-auto" style={{width:400, background: "#eee", padding:20, marginTop: 60}}>
                    <p style={{textAlign:"center"}}>Sign Up</p>
                    <Formik 
                        initialValues={{email: "", password: "", tel: ""}}
                        onSubmit={values => {this.handleSubmit(values)}}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            passward: Yup.string().required(),
                            tel: Yup.string().required()
                        })}
                    >
                        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.passward}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.passward && errors.passward ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.passward}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="tel">Tel</Label>
                                    <Input
                                        type="tel"
                                        name="tel"
                                        id="tel"
                                        value={values.tel}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.tel && errors.tel ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.tel}
                                    </FormFeedback>
                                </FormGroup>
                                <div style={{ textAlign: "center"}}>
                                    <Button color="success" type="submit" disabled={this.state.loading}>
                                        <Spinner size="sm" color="light" style={{marginRight: 5}} hidden={!this.state.loading} />
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: "#fff", padding: 20 }}>
                    <Link to="/signin">Login here</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);