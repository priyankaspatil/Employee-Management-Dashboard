import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import FormInput from "../../Components/FormInput";
import axios from "axios";
import "./Register.css";

class SignUp extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:'',
        redirectTo:''
      }
  }

  signUp = () => {
    const { firstname, lastname, email, username, password } = this.state;
    const newUser = {
      firstname,
      lastname,
      email,
      username,
      password
    };
    // this.props.AddNewUser(newUser);
    // this.setState({ redirectTo: "/signup" });
    debugger;

    axios({
      method: "POST",
      url: "http://localhost:3007/register",
      data: newUser
    }).then(data => {
      console.log("Data successfully registered====>",data);
    });
    debugger;
  } 

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={this.state.redirectTo} push />;
    // }
    return (
      <Grid className="sign-up_grid-wrapper">
        <h2 className="sign-up-header">SIGN UP</h2>
        <FormInput label="Firstname" name="firstname" type="text" onChange={this.onChange} placeholder="Enter Firstname"/>
        <FormInput label="Lastname" name="lastname" type="text" onChange={this.onChange} placeholder="Enter Lastname"/>
        <FormInput label="Email" name="email" type="email" onChange={this.onChange} placeholder="Enter Email"/>
        <FormInput label="Username" name="username" type="text" onChange={this.onChange} placeholder="Enter Username"/>
        <FormInput label="Password" name="password" type="password" onChange={this.onChange} placeholder="Enter Password"/>
        <Button variant="contained" color="primary" onClick={this.signUp} className="btn">
          Sign Up
        </Button>
      </Grid>
    );
  }
}

export default SignUp;
