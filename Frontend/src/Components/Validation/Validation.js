const validateEmail = () => {
    const { email } = this.state;
    const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    this.setState({
        emailError:
            regexEmail.test(email) ? null : console.log('enterValidEmail_login'),
        emailStatus: false
    }, () => {
        if (regexEmail.test(email)) {
            this.setState({ emailStatus: true });
        }
    });
}

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

const validatePassword = () => {
    const { password } = this.state;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()._*])(?=.{8,})/;
    this.setState({
        passwordError:
            regexPassword.test(password) ? null : console.log('enterPwd_register'),
        passwordStatus: false
    }, () => {
        if (regexPassword.test(password)) {
            this.setState({ passwordStatus: true });
        }
    });
}

// onBackButtonEvent = (event) => {
//     event.preventDefault();
// }

// handleChangeEmail = (event) => {
//     this.setState({ email: event.target.value }, () => {
//         this.validateEmail();
//     });
// }

// handleChangePassword = (password) => {
//     this.setState({ password }, () => {
//         this.validatePassword();
//     });
// }

// gotoForgotPassword = () => {
//     // eslint-disable-next-line
//     this.props.history.push('/forgotPassword');
// }

// login = () => {
//     const { email, password, deviceId, emailStatus, passwordStatus } = this.state;
//     if (emailStatus && passwordStatus) {
//         // event.preventDefault();
//         const user = { email, password, deviceId };
//         // eslint-disable-next-line
//         this.props.loginRequest(user);
//     }
// }

// check = () => {
//     const { email, password } = this.state;
//     if (email && password) {
//         this.setState({ buttonEnabled: true, color: 'background' });
//     } else {
//         this.setState({ buttonEnabled: false, color: '' });
//     }
// }

// _handleKeyPress=(e) => {
//     if (e.key === 'Enter') {
//         this.login();
//     }
// };

module.exports = {
    validateEmail,
    validatePassword
  }