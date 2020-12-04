import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import ROUTES from "../../helper/constants";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Cryptr from "cryptr";
import "./Register.css";

const cryptr = new Cryptr("myTotalySecretKey");

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      dob: null,
      company: "",
      showAddEmpDetails: false,
      isEmailExist: false,
      emailErrorMsg: "",
      showPasswordError: false,
      passwordErrorMsg: "",
      isRequiredMsg: ""
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  signUp = async () => {
    let userDetails = [];
    let emailErr = false;
    const {
      firstname,
      lastname,
      email,
      address,
      password,
      dob,
      company
    } = this.state;
    let encryptedPwd = cryptr.encrypt(password);

    const newUser = {
      firstname,
      lastname,
      email,
      address,
      encryptedPwd,
      dob,
      company
    };
    if (userDetails && userDetails.length > 0) {
      userDetails.map(item => {
        if (newUser.email === item.email) {
          this.setState({ emailErrorMsg: "Email already exists" });
          emailErr = true;
        } else {
          userDetails.push(...userDetails, newUser);
        }
      });
    } else {
      userDetails.push(...userDetails, newUser);
    }

    if (!emailErr) {
      let e = null;
      this.setState({
        users: userDetails,
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        password: "",
        dob: null,
        company: ""
      });
      this.props.history.push(ROUTES.Login, userDetails);
      await this.props.handleChange(e, 1);

      //api for registeration of manager
      // axios({
      //   method: "POST",
      //   url: "http://localhost:3007/register",
      //   data: newUser
      // }).then(data => {
      //   const result = data.data;
      //   { result === "Successful" ? this.props.history.push(ROUTES.Login) : console.log("Registration failed :(") }
      //   // console.log("Data successfully registered====>",data.data);
      // });
    }
    else {
      this.setState({ isRequiredMsg: 'Please enter the required fields.' })
    }

    // { data === "Successful" ? this.setState({showAddEmpDetails: true}) : alert("Registration Unsuccessful.") }
    // console.log("Register showAddEmpDetails state=====>", this.state.showAddEmpDetails)
    // console.log("Register props========>",this.props.props.showAddDetailsComp)
    // this.props.props.showAddDetailsComp(this.state.showAddEmpDetails);
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validatePassword = e => {
    let value = e.target.value;
    this.setState({
      value: value,
      password: value
    });
    
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
    const { emailErrorMsg, isRequiredMsg, firstname, lastname, email, address, dob, company, password } = this.state;

    return (
      <Grid container className="sign-up_grid-wrapper">
        {/* <h2 className="sign-up-header">SIGN UP</h2> */}
        <Grid item xs className="input-field_grid">
          <TextField
            required
            className="input-field"
            label="Firstname"
            name="firstname"
            type="text"
            onChange={this.onChange}
            placeholder="Enter Firstname"
          />
           {isRequiredMsg && firstname === "" ?
                (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                    {isRequiredMsg}
                </div>) : null}
          <TextField
            required
            className="input-field"
            label="Lastname"
            name="lastname"
            type="text"
            onChange={this.onChange}
            placeholder="Enter Lastname"
          />
          {isRequiredMsg && lastname === "" ?
               (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div>) : null}
          <TextField
            required
            className="input-field"
            label="Email"
            name="email"
            type="email"
            onChange={this.onChange}
            placeholder="Enter Email"
          />
          {emailErrorMsg ? (
            <div className="err__text">{emailErrorMsg}</div>
          ) : isRequiredMsg && email === "" ?
               (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div>) : null}
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
          {isRequiredMsg && password === "" ?
               <div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div> : null}
          <TextField
            required
            className="input-field"
            label="Address"
            name="address"
            type="text"
            onChange={this.onChange}
            placeholder="Enter Address"
          />
          {isRequiredMsg && address === "" ?
               (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div>) : null}
          <TextField
            required
            className="input-field"
            label="Date of Birth"
            name="dob"
            type="date"
            onChange={this.onChange}
            placeholder="Enter Date of Birth"
          />
          {isRequiredMsg && dob === null ?
               (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div>) : null}
          <TextField
            required
            className="input-field"
            label="Company"
            name="company"
            type="company"
            onChange={this.onChange}
            placeholder="Enter Company"
          />
          {isRequiredMsg && company === "" ?
               (<div className="err__text" style={{color:'red', textAlign:'left'}}>
                   {isRequiredMsg}
               </div>) : null}
        </Grid>
        <Grid item xs className="sign-up-btn_grid">
          <Button
            variant="contained"
            color="primary"
            onClick={this.signUp}
            className="btn"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(SignUp);
