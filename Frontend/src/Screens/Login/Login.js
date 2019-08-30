import React from "react";
// import { Redirect } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";
// import FormInput from "../../Components/FormInput/FormInput";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import axios from "axios";
import ROUTES from '../../helper/constants';
import "./Login.css";

let regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/';

class Login extends React.Component {
  state = {
    username: "",
    password:"",
    errorMsg: '',
    value: '',
    showUsernameError: false,
    showPasswordError: false,
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  checkUser = async () => {
    // debugger;
    const { username, password } = this.state;
    const userDetails = {
      username,
      password
    };
    // this.props.Check(userDetails);
    console.log(userDetails);

    let res = await axios.post("http://localhost:3007/users", userDetails);
    let { data } = res.data;
    console.log("Login data ===>",data)

    // axios({
    //   method: "POST",
    //   url: "http://localhost:3007/users",
    //   data: userDetails
    // }).then(data => {
    //   console.log("Axios login page===>",data);
    //   const result = data.data;
    //   { result === "Successful" ? this.props.props.history.push(ROUTES.HomePage) : console.log("Login Unsuccessful :(") }
      
    // });
    debugger;
  };

  // onChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // };

  validateUsername = e => {
    let value = e.target.value;
      this.setState({
          value: value,
          username: value
      })
      console.log("Username====>", this.state.username);
      let regx = /^[a-z0-9_-]{3,16}$/;
      if (regx.test(value) === false) {
        this.setState({
            showUsernameError: true,
            errorMsg: 'Please add a valid username'
        })
      } else if (value.length < 3 || value.length > 16) {
        this.setState({
            showUsernameError: true,
            errorMsg: "The username has to be greater than 3 and less than 16 characters."
        })
      }else if (value === '') {
        this.setState({
            showUsernameError: false,
            errorMsg: value
        })
      }
      else {
        this.setState({
            showUsernameError: false,
            errorMsg: 'value'
        })
      }
  }

  validatePassword = e => {
    let value = e.target.value;
      this.setState({
          value: value,
          password: value
      })
      console.log("Password====>", this.state.password);
      let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/;
      if (regx.test(value) === false) {
        this.setState({
            showPasswordError: true,
            errorMsg: 'The password is not valid'
        })
      } else if (value.length < 9) {
        this.setState({
            showPasswordError: true,
            errorMsg: "The password length can't be greater than 9 characters"
        })
      }
      else {
        this.setState({
            showPasswordError: false,
            errorMsg: 'value'
        })
      }
  }


  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={this.state.redirectTo} push />;
    // }
    const { match, location, history } = this.props;

    console.log("These are props==========>",this.props);
    return (
        <Grid className="login-container_wrapper">
          <h2 className="login-header">LOGIN</h2>
          <Grid item className="username-grid">
            <TextField 
              label="Username" 
              name="username" 
              type="text" 
              onChange={this.validateUsername} 
              placeholder="Enter Username"
              inputProps={{
                maxLength: 16,
                min: 3
              }}
              />
              {this.state.showUsernameError ?
                <div className="err__text" style={{color: 'red'}}>
                    {this.state.errorMsg}
                </div> : null}
          </Grid>
          <Grid item className="password-grid">
            <TextField 
            label="Password" 
            name="password" 
            type="password" 
            // onChange={this.onChange} 
            placeholder="Enter Password" 
            onChange={this.validatePassword}
            inputProps={{
              maxLength: 9,
              min: 0
            }}
            />
            {this.state.showPasswordError ?
              <div className="err__text" style={{color: 'red'}}>
                  {this.state.errorMsg}
              </div> : null}
          </Grid>
          <Button variant="contained" color="primary" className="btn" onClick={this.checkUser}>
            Submit
          </Button>
        </Grid>
    );
  }
}

export default withRouter(Login);
