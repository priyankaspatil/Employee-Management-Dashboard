import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import FormInput from "../FormInput/FormInput";
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import axios from "axios";
import ROUTES from '../../helper/constants';
import Alert from '../ModalDialog/AlertModalDialog';
import "./AddUserDetails.css";
import DeskArea from "../../Screens/DeskAreaScree/DeskAreaScreen";

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
        empFunctionHead: "",
        empDesignation: "",
        empTeam: "",
        saveData: false
      }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onSave = async () => {
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
    debugger;
    this.setState({saveData: true})
    // console.log("In UserDeatails ===>", AddUserDetails);
    // console.log("In state ===>", this.state);
    // console.log("AddUserDetails props======>",this.props)
    let res = await axios.post("http://localhost:3007/adduserdetails", AddUserDetails);
    let data = res.data;
    console.log(data)
    { data === "Successful" ? this.props.history.push(ROUTES.HomePage, this.state) : console.log("Unsuccessful :(") }
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3007/adduserdetails",
    //   data: AddUserDetails
    // }).then(data => {
    //   const result = data.data;
    //   { result === "Successful" ? this.props.history.push(ROUTES.HomePage) : console.log("Failed to add user details :(") }
    //   // console.log("Data successfully registered====>",data.data);
    // });
    // debugger;
  } 

  // onCancel = () => {
  //   // this.props.history.push(ROUTES.Login);
  // }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log("Home page  state=>", this.state)
    return (
      <Paper container className="add-user-grid-wrapper">
        <Grid className="add-user-details_grid-wrapper">
          <h2 className="add-user-details-header">Add Your Employee Details</h2>
          <Grid className="add-user-details-forminput-grid">
            <Grid className="forminput-grid">
              <FormInput label="Name" name="empName" type="text" onChange={this.onChange} placeholder="Enter Name"/>
              <FormInput label="Employee Id" name="empId" type="text" onChange={this.onChange} placeholder="Enter Employee Id"/>
              <FormInput label="Designation" name="empDesignatioj" type="text" onChange={this.onChange} placeholder="Enter Your Designation"/>
              <FormInput label="Desk No" name="empDeskNo" type="text" onChange={this.onChange} placeholder="Enter Desk No"/>
              <FormInput label="Project" name="empProject" type="text" onChange={this.onChange} placeholder="Enter Project Name"/>
              <FormInput label="Cost Center" name="empCostCenter" type="text" onChange={this.onChange} placeholder="Enter Employee Cost Center"/>
            </Grid>
            <Grid className="forminput-grid">
              <FormInput label="Unit" name="empUnit" type="text" onChange={this.onChange} placeholder="Enter Employee Unit"/>
              <FormInput label="Band" name="empBand" type="text" onChange={this.onChange} placeholder="Enter Employee Band"/>
              <FormInput label="Team" name="empTeam" type="text" onChange={this.onChange} placeholder="Enter Your Team"/>
              <FormInput label="Immediate Reporting Manager" name="empImmRepManager" type="text" onChange={this.onChange} placeholder="Immediate Reporting Manager"/>
              <FormInput label="Reporting Manager" name="empRepManager" type="text" onChange={this.onChange} placeholder="Enter Reporting Manager"/>
              <FormInput label="Function Head" name="empFunctionHead" type="text" onChange={this.onChange} placeholder="Enter Function Head"/>
            </Grid>
          </Grid>
          <Grid className="alert-model-dialog_grid">
            <Button variant="contained" color="primary" onClick={this.onSave} className="btn">
              Save
            </Button>
            {/* <Button variant="contained" color="secondary" onClick={this.onCancel} className="btn">
              Cancel
            </Button> */}
            <Alert props={this.props}/> 
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withRouter(UserDeatails);
