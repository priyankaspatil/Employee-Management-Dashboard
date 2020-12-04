import React from "react";
import { Button, Grid, Paper, Modal } from "@material-ui/core";
// import { InlineDatePicker } from 'material-ui-pickers';
import FormInput from "../FormInput/FormInput";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from "axios";
import ROUTES from "../../helper/constants";
// import Alert from "../ModalDialog/AlertModalDialog";
import BasicDialog from "../BasicDialog/BasicDialog";
import "./AddUserDetails.css";
import moment from 'moment';

class UserDeatails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      city: "",
      empdob: null,
      address: "",
      mobile: "",
      isConfirmDialogOpen: false,
      isChanged: false,
      isEdit: false,
      isUpdateConfirm: false
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onSave = async () => {
    const {
      firstname,
      lastname,
      email,
      company,
      city,
      empdob,
      address,
      mobile
    } = this.state;
    const AddEmpDetails = {
      firstname,
      lastname,
      email,
      company,
      city,
      empdob,
      address,
      mobile
    };

    // let res = await axios.post(
    //   "http://localhost:3007/addempdetails",
    //   AddEmpDetails
    // );
    // let data = res.data;
    // console.log("add emp data",data);
    // {
    //   data === "Successful"
    //     ? this.props.history.push(ROUTES.HomePage, { AddEmpDetails })
    //     : console.log("Service error!! Please try again later.");
    // }
    if(this.props.isEdit) {
      this.setState({ isUpdateConfirm: true});
    }
    else {
      await this.props.handleSaveAddedData(AddEmpDetails);
      await this.props.handleCancel();
    }
    
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3007/addempdetails",
    //   data: AddEmpDetails
    // }).then(data => {
    //   const result = data.data;
    //   {
    //     result === "Successful"
    //       ? this.props.history.push(ROUTES.HomePage)
    //       : console.log("Failed to add employee details.");
    //   }
    // });
  };

  // onCancel = () => {
  //   // this.props.history.push(ROUTES.Login);
  // }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isChanged: true
    });
  };

  onDateChange = event => {
    let empDateOfBirth = moment(event._d).format('MM/DD/YYYY');
    this.setState({
      empdob: empDateOfBirth
    });
  };

  onCancel = event => {
    const { isChanged } = this.state;
    if(isChanged) {
      this.setState({ isConfirmDialogOpen: true });
    }
    else {
      this.setState({ isConfirmDialogOpen: false });
      this.props.handleCancel();
    }
  };

  handleClose = e => {
    this.setState({isConfirmDialogOpen: false});
  };

  handleContinue = async e => {
    const {
      firstname,
      lastname,
      email,
      company,
      city,
      empdob,
      address,
      mobile
    } = this.state;
    const editEmpDetails = {
      firstname,
      lastname,
      email,
      company,
      city,
      empdob,
      address,
      mobile
    };

    if(this.props && this.props.isEdit) {
      await this.props.handleSaveAddedData(editEmpDetails);
      this.setState({isConfirmDialogOpen: false});
      await this.props.handleCancel();
    }
    else{
      this.setState({isConfirmDialogOpen: false});
      await this.props.handleCancel();
    }
  };

  render() {
    const { isOpen, isEdit, editData } = this.props;
    const { isConfirmDialogOpen, isUpdateConfirm } = this.state;
    console.log('editDta ', editData);

    return (
      <div>
        <Modal
          open={isOpen}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="add-employee-details__modalbox"
        >
          <Paper container className="add-user-grid-wrapper">
            <Grid className="add-user-details_grid-wrapper">
              {isEdit ? (<h2 className="add-user-details-header">
                Edit Employee Details
              </h2>) : (<h2 className="add-user-details-header">
                Add Employee Details
              </h2>)}
              <Grid className="add-user-details-forminput-grid">
                <Grid className="forminput-grid">
                  <FormInput
                    label="Firstname"
                    name="firstname"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee Firstname"
                  />
                  <FormInput
                    label="Lastname"
                    name="lastname"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee Lastname"
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee Email"
                  />
                  <FormInput
                    label="Address"
                    name="address"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee Address"
                  />
                  {/* <InlineDatePicker 
                    keyboard={false}
                    format='MM/DD/YYYY'
                    placeholder='MM/DD/YYYY'
                    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  /> */}
                </Grid>
                <Grid className="forminput-grid">
                  <FormInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    onChange={this.onDateChange}
                    // placeholder="Enter Employee Date of Birth"
                  />
                  <FormInput
                    label="Company"
                    name="company"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee Company Name"
                  />
                  <FormInput
                    label="Mobile"
                    name="mobile"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Mobile Number"
                  />
                  <FormInput
                    label="City"
                    name="city"
                    type="text"
                    onChange={this.onChange}
                    placeholder="Enter Employee City Name"
                  />
                </Grid>
              </Grid>
              <Grid className="alert-model-dialog_grid">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSave}
                  className="btn"
                >
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={this.onCancel} className="btn">
              Cancel
            </Button>
                {isConfirmDialogOpen && 
                  <BasicDialog
                    isOpen={isConfirmDialogOpen}
                    modalTitle={"Alert"}
                    modalContent={"Once you cancel, your employee details won't be saved. Are you sure you want cancel ?"}
                    modalCancelButtonText={"No"}
                    modalOkButtonText={"Yes"}
                    modalCancelEvent={e => {
                      this.handleClose(e);
                    }}
                    modalOkEvent={e => {
                      this.handleContinue(e);
                    }}
                  />}
                  {isUpdateConfirm && 
                  <BasicDialog
                    isOpen={isUpdateConfirm}
                    modalTitle={"Alert"}
                    modalContent={"Are you sure you want update employee details?"}
                    modalCancelButtonText={"No"}
                    modalOkButtonText={"Yes"}
                    modalCancelEvent={e => {
                      this.handleClose(e);
                    }}
                    modalOkEvent={e => {
                      this.handleContinue(e);
                    }}
                  />}
                {/* <Alert props={this.props} /> */}
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default withRouter(UserDeatails);
