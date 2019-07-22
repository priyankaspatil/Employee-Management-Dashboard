import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import FormInput from "../../Components/FormInput";
import axios from "axios";
import "./Login.css";

const routes = {
  "HomePage" : "/home"
}

class Login extends React.Component {
  state = {
    username: "",
    password:""
  };


  checkUser = () => {
    // debugger;
    const { username, password } = this.state;
    const userDetails = {
      username,
      password
    };
    // this.props.Check(userDetails);
    // 
    console.log(userDetails);

    axios({
      method: "POST",
      url: "http://localhost:3007/users",
      data: userDetails
    }).then(data => {
      console.log(data.data);
    });
    // debugger;
  };

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
        <Grid className="login-container_wrapper">
          <h2 className="login-header">LOGIN</h2>
          <FormInput label="Username" name="username" type="text" onChange={this.onChange} placeholder="Enter Username"/>
          <FormInput label="Password" name="password" type="password" onChange={this.onChange} placeholder="Enter Password"/>
          <Button variant="contained" color="primary" className="btn" onClick={this.checkUser}>
            Submit
          </Button>
        </Grid>
    );
  }
}

export default Login;
