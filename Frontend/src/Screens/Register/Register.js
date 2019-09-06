import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";
// import FormInput from "../../Components/FormInput/FormInput";
import axios from "axios";
import ROUTES from '../../helper/constants';
import "./Register.css";

class SignUp extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:''
      }
  }

  signUp = async () => {
    const { firstname, lastname, email, username, password } = this.state;
    const newUser = {
      firstname,
      lastname,
      email,
      username,
      password
    };
    
    let res = await axios.post("http://localhost:3007/register", newUser);
    let data  = res.data;

    { data === "Successful" ? this.props.history.push(ROUTES.HomePage) : alert("Registration Unsuccessful.") }

    // axios({
    //   method: "POST",
    //   url: "http://localhost:3007/register",
    //   data: newUser
    // }).then(data => {
    //   const result = data.data;
    //   { result === "Successful" ? this.props.history.push(ROUTES.UserDetails) : console.log("Registration failed :(") }
    //   // console.log("Data successfully registered====>",data.data);
    // });
    debugger;
  } 

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Grid container className="sign-up_grid-wrapper">
        {/* <h2 className="sign-up-header">SIGN UP</h2> */}
        <Grid item xs className="input-field_grid">
          <TextField className="input-field" label="Firstname" name="firstname" type="text" onChange={this.onChange} placeholder="Enter Firstname"/>
          <TextField className="input-field" label="Lastname" name="lastname" type="text" onChange={this.onChange} placeholder="Enter Lastname"/>
          <TextField className="input-field" label="Email" name="email" type="email" onChange={this.onChange} placeholder="Enter Email"/>
          <TextField className="input-field" label="Username" name="username" type="text" onChange={this.onChange} placeholder="Enter Username"/>
          <TextField className="input-field" label="Password" name="password" type="password" onChange={this.onChange} placeholder="Enter Password"/>
        </Grid>
        <Grid item xs className="sign-up-btn_grid">
          <Button variant="contained" color="primary" onClick={this.signUp} className="btn">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default SignUp;
