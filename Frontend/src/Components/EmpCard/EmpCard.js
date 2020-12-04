import React from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
// import ROUTES from '../../helper/constants';
// import ProfileImage from "../../assets/images/profile_img.jpg";
import "./EmpCard.css";

export default function EmpCard(props) {
  // let EmployeeData = [];
  // if (props && props.EmpCardDetails && props.EmpCardDetails.length > 0) {
  //   let data = props.EmployeeDetails;
  //   EmployeeData = data && data.length !== 0 ? data.sort((a, b) => a.firstname - b.firstname) : [];
  // }
  // console.log("NewEmpdetails", EmployeeData);

  const handleUpdateEmpDetails = async (e, changedDetails) => {
    props.handleOpenDialog();
    await props.handleUpdateEmpDetails(changedDetails);
  }

  const handleDeleteEmpDetails = async (e, id) => {
    await props.handleDeleteEmpDetails(id);
  }

  return (
    <Grid className='emp--card__wrapper'>
      {props &&
        props.EmpCardDetails &&
        props.EmpCardDetails.length > 0 &&
        props.EmpCardDetails.map(employee => {
          return (
            <Paper className="emp-card_wrapper-grid">
              {/* {ProfileImage && <Grid item xs className="card_img-grid">
                <img  src={ProfileImage} alt={'Profile Image'} className='profile_img'/>
              </Grid>} */}
              <Grid item xs className="emp-content--grid">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className="profile_name"
                >
                  <label className="profile_details-label">Firstname: </label>
                  {employee.firstname}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className="profile_designation"
                >
                  <label className="profile_details-label">Lastname: </label>
                  {employee.lastname}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">Email ID: </label>
                  {employee.email}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">Company: </label>
                  {employee.company}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">City: </label>
                  {employee.city}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">DOB: </label>
                  {employee.empdob}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">Address: </label>
                  {employee.address}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  className="profile_details"
                >
                  <label className="profile_details-label">Mobile: </label>
                  {employee.mobile}
                </Typography>
              </Grid>
              <Grid item xs className="emp-button--grid">
                <Button 
                  variant="contained" 
                  color="lightBlue" 
                  onClick={(e) => handleUpdateEmpDetails(e, employee)} 
                  className="btn"
                >
                  Update
                </Button>
                
                <Button
                  variant="contained" 
                  color="secondary" 
                  onClick={(e) => handleDeleteEmpDetails(e, employee.id)} 
                  className="btn"
                >
                  Delete
                </Button>
              </Grid>
            </Paper>
          );
        })}
    </Grid>
  );
}
