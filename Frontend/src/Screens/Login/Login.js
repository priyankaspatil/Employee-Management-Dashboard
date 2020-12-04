import React from "react";
// import { Redirect } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
// import axios from "axios";
import ROUTES from "../../helper/constants";
import Cryptr from "cryptr";
import "./Login.css";

const cryptr = new Cryptr("myTotalySecretKey");
let regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    emailErrorMsg: "",
    passwordErrorMsg: "",
    value: "",
    showEmailError: false,
    showPasswordError: false,
    isRequiredMsg: ""
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  checkUser = async () => {
    const { email, password } = this.state;
    console.log("user pwd", password);
    let encryptedPwd = cryptr.encrypt(password);
    let existingUsers = [];
    const userDetails = {
      email,
      encryptedPwd
    };

    //api for fetching existing users
    // let res = await axios.post("http://localhost:3007/users", userDetails);
    // let data  = res.data;


    existingUsers = this.props.location.state;
    existingUsers &&
      existingUsers.length !== 0 &&
      existingUsers.map(item => {
        let decryptedPwd = cryptr.decrypt(item.encryptedPwd);
        if (item.email === email && decryptedPwd === password) {
          console.log("Logged In successfully!!");
          this.props.history.push(ROUTES.HomePage);
        } else {
          this.setState({
            emailErrorMsg: "Email or password does not exist",
            showEmailError: true
          });
        }
      });

    if (email === "" && password === "") {
      this.setState({ isRequiredMsg: "Please enter the required fields." });
    }
  };

  // onChange = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // };

  validateEmail = e => {
    const { email } = this.state;
    let value = e.target.value;
    this.setState({
      value: value,
      email: value
    });
    const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.setState(
      {
        emailError: regexEmail.test(email)
          ? null
          : console.log("Enter a valid email"),
        emailStatus: false
      },
      () => {
        if (regexEmail.test(email)) {
          this.setState({ emailStatus: true });
        }
      }
    );
  };

  validatePassword = e => {
    let value = e.target.value;
    this.setState({
      value: value,
      password: value
    });
    console.log("Password====>", this.state.password);
    let regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/;
    if (regx.test(value) === false) {
      this.setState({
        showPasswordError: true,
        passwordErrorMsg: "The password is not valid"
      });
    } else if (value.length < 9) {
      this.setState({
        showPasswordError: true,
        passwordErrorMsg: "Minimun 9 characters required"
      });
    } else if (value === null) {
      this.setState({
        showEmailError: false,
        passwordErrorMsg: value
      });
    } else {
      this.setState({
        showPasswordError: false,
        passwordErrorMsg: "value"
      });
    }
  };

  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={this.state.redirectTo} push />;
    // }
    const { match, location, history } = this.props;
    const { email, password, isRequiredMsg } = this.state;

    return (
      <Grid container className="login-container_wrapper">
        {/* <h2 className="login-header">LOGIN</h2> */}
        <Grid item xs className="input-field_grid">
          <Grid item xs className="email-grid">
            <TextField
              label="Email"
              name="email"
              type="text"
              id="standard-name"
              onChange={this.validateEmail}
              className="input-field"
              placeholder="Enter Email"
              inputProps={{
                maxLength: 100,
                min: 3
              }}
            />
            {this.state.showEmailError ? (
              <div className="err__text">{this.state.emailErrorMsg}</div>
            ) : isRequiredMsg && email === "" ? (
              <div
                className="err__text"
                style={{ color: "red", textAlign: "left" }}
              >
                {isRequiredMsg}
              </div>
            ) : null}
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
            {this.state.showPasswordError ? (
              <div className="err__text">{this.state.passwordErrorMsg}</div>
            ) : isRequiredMsg && password === "" ? (
              <div
                className="err__text"
                style={{ color: "red", textAlign: "left" }}
              >
                {isRequiredMsg}
              </div>
            ) : null}
          </Grid>
        </Grid>
        <Grid item xs className="login__btn-grid">
          <Button
            variant="contained"
            color="primary"
            onClick={this.checkUser}
            className="btn"
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Login);
