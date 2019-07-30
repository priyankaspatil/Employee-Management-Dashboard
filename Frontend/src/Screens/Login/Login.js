import React from "react";
// import { Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import FormInput from "../../Components/FormInput";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import axios from "axios";
import ROUTES from '../../helper/constants';
import "./Login.css";


class Login extends React.Component {
  state = {
    username: "",
    password:"",
    // usernameError: '',
    // passwordError: '',
    // usernameStatus: false,
    // passwordStatus: false,
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  checkUser = () => {
    // debugger;
    const { username, password } = this.state;
    const userDetails = {
      username,
      password
    };
    // this.props.Check(userDetails);
    console.log(userDetails);

    axios({
      method: "POST",
      url: "http://localhost:3007/users",
      data: userDetails
    }).then(data => {
      // console.log(data.data);
      const result = data.data;
      { result === "Successful" ? this.props.props.history.push(ROUTES.HomePage) : console.log("Login Unsuccessful :(") }
      
    });
    // debugger;
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };


  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={this.state.redirectTo} push />;
    // }
    const { match, location, history } = this.props;

    console.log("These are props==========>",this.props);
    return (
        <Grid className="login-container_wrapper">
          <h2 className="login-header">LOGIN</h2>
          <FormInput label="Username" name="username" type="text" onChange={this.onChange} placeholder="Enter Username"/>
          <FormInput label="Password" name="password" type="password" onChange={this.onChange} placeholder="Enter Password" onPaste={this.handleChangePassword}/>
          <Button variant="contained" color="primary" className="btn" onClick={this.checkUser}>
            Submit
          </Button>
        </Grid>
    );
  }
}

export default withRouter(Login);
