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
    usernameErrorMsg: '',
    passwordErrorMsg: '',
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
    console.log("Login props==========>", this.props)

    let res = await axios.post("http://localhost:3007/users", userDetails);
    // console.log('Login res==>', res);
    let data  = res.data;
    // console.log("Login data ===>",data)
    { data === "Successful" ? this.props.history.push(ROUTES.HomePage) : console.log("Login Unsuccessful :(") }
    debugger;
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3007/users",
    //   data: userDetails
    // }).then(data => {
    //   console.log("Axios login page===>",data);
    //   const result = data.data;
    //   { result === "Successful" ? this.props.history.push(ROUTES.HomePage) : console.log("Login Unsuccessful :(") }
      
    // });
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
            usernameErrorMsg: 'Please add a valid username'
        })
      } else if (value.length < 3 || value.length > 16) {
        this.setState({
            showUsernameError: true,
            usernameErrorMsg: "The username has to be greater than 3 and less than 16 characters."
        })
      }else if (value === null ) {
        this.setState({
            showUsernameError: false,
            usernameErrorMsg: value
        })
      }
      else {
        this.setState({
            showUsernameError: false,
            usernameErrorMsg: 'value'
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
            passwordErrorMsg: 'The password is not valid'
        })
      } else if (value.length < 9) {
        this.setState({
            showPasswordError: true,
            passwordErrorMsg: "The password length can't be less than 9 characters"
        })
      }else if (value === null ) {
        this.setState({
            showUsernameError: false,
            passwordErrorMsg: value
        })
      }
      else {
        this.setState({
            showPasswordError: false,
            passwordErrorMsg: 'value'
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
        <Grid container className="login-container_wrapper">
          {/* <h2 className="login-header">LOGIN</h2> */}
          <Grid item xs className="input-field_grid">
            <Grid item xs className="username-grid">
              <TextField 
                  label="Username" 
                  name="username" 
                  type="text" 
                  id="standard-name"
                  onChange={this.validateUsername} 
                  className="input-field"
                  placeholder="Enter Username"
                  inputProps={{
                    maxLength: 16,
                    min: 3
                  }}
                  />
                  {this.state.showUsernameError ?
                    <div className="err__text">
                        {this.state.usernameErrorMsg}
                    </div> : null}
            </Grid>
            <Grid item xs className="password-grid">
              <TextField 
              label="Password" 
              name="password" 
              type="password" 
              id="standard-password-input"
              className="input-field"
              // onChange={this.onChange} 
              placeholder="Enter Password" 
              onChange={this.validatePassword}
              inputProps={{
                maxLength: 9,
                min: 0
              }}
              />
              {this.state.showPasswordError ?
                <div className="err__text">
                    {this.state.passwordErrorMsg}
                </div> : null}
              </Grid>
          </Grid>
          <Grid item xs className="login__btn-grid">
            <Button variant="contained" color="primary" onClick={this.checkUser} className="btn">
              Login
            </Button>
          </Grid>
        </Grid>
    );
  }
}

export default withRouter(Login);
