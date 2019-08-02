import React from "react";
import { Button, Grid } from "@material-ui/core";
import FormInput from "../FormInput/FormInput";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import axios from "axios";
import ROUTES from '../../helper/constants';
import "./AddUserDetails.css";

class UserDeatails extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        empName: "",
        empId: "",
        empDeskNo: "",
        empProject: "",
        empCostCenter: "",
        empUnit: "",
        empBand: "",
        empImmRepManager: "",
        empRepManager: "",
        empFunctionHead: ""
      }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onSave = () => {
    const { empName, empId, empDeskNo, empProject, empCostCenter, empUnit, empBand, empImmRepManager, empRepManager, empFunctionHead} = this.state;
    const AddUserDetails = {
        empName,
        empId,
        empDeskNo,
        empProject,
        empCostCenter,
        empUnit,
        empBand,
        empImmRepManager,
        empRepManager,
        empFunctionHead
    };
    // debugger;
    // console.log("In UserDeatails ===>", AddUserDetails);
    // console.log("In state ===>", this.state);
    // console.log("AddUserDetails props======>",this.props)
    axios({
      method: "POST",
      url: "http://localhost:3007/adduserdetails",
      data: AddUserDetails
    }).then(data => {
      const result = data.data;
      { result === "Successful" ? this.props.history.push(ROUTES.HomePage) : console.log("Failed to add user details :(") }
      // console.log("Data successfully registered====>",data.data);
    });
    // debugger;
  } 

  onCancel = () => {
    console.log("THIS IS TO CHECK PROPS IN CANCEL FUNCTION", this.props);
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <Grid className="add-user-details_grid-wrapper">
        <h2 className="add-user-details-header">Add Your Employee Details</h2>
        <FormInput label="Name" name="empName" type="text" onChange={this.onChange} placeholder="Enter Name"/>
        <FormInput label="Employee Id" name="empId" type="text" onChange={this.onChange} placeholder="Enter Employee Id"/>
        <FormInput label="Desk No" name="empDeskNo" type="text" onChange={this.onChange} placeholder="Enter Desk No"/>
        <FormInput label="Project" name="empProject" type="text" onChange={this.onChange} placeholder="Enter Project Name"/>
        <FormInput label="Cost Center" name="empCostCenter" type="text" onChange={this.onChange} placeholder="Enter Employee Cost Center"/>
        <FormInput label="Unit" name="empUnit" type="text" onChange={this.onChange} placeholder="Enter Employee Unit"/>
        <FormInput label="Band" name="empBand" type="text" onChange={this.onChange} placeholder="Enter Employee Band"/>
        <FormInput label="Immediate Reporting Manager" name="empImmRepManager" type="text" onChange={this.onChange} placeholder="Enter Immediate Reporting Manager"/>
        <FormInput label="Reporting Manager" name="empRepManager" type="text" onChange={this.onChange} placeholder="Enter Reporting Manager"/>
        <FormInput label="Function Head" name="empFunctionHead" type="text" onChange={this.onChange} placeholder="Enter Function Head"/>
        <Button variant="contained" color="primary" onClick={this.onSave} className="btn">
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={this.onCancel} className="btn">
          Cancel
        </Button>
      </Grid>
    );
  }
}

export default withRouter(UserDeatails);