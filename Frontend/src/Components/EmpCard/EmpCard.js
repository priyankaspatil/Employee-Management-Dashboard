import React from 'react';
import {Paper, Grid, Typography} from '@material-ui/core';
// import ROUTES from '../../helper/constants';
import ProfileImage from '../../assets/images/profile_img.jpg';
import "./EmpCard.css"

export default function EmpCard(props) {
  console.log("Emp Card Props====>", props);
  
  return (
    <Paper className="emp-card_wrapper-grid">
      <Grid item xs className="card_img-grid">
        <img  src={ProfileImage} alt={'Profile Image'} className='profile_img'/>
      </Grid>
      <Grid item xs className="emp-content--grid">
        <Typography gutterBottom variant="h5" component="h2" className="profile_name">
          {props.EmpCardDetails.empName}
        </Typography>
        <Typography variant="body1" component="p" className="profile_designation">
          {props.EmpCardDetails.empDesignation}
        </Typography>
        <Typography variant="body2" component="p" className="profile_details">
          <label className="profile_details-label">Emp ID: </label>{props.EmpCardDetails.empId}
        </Typography>
        <Typography variant="body2" component="p" className="profile_details">
          <label className="profile_details-label">Cost Center: </label>{props.EmpCardDetails.empCostCenter}
        </Typography>
        <Typography variant="body2" component="p" className="profile_details">
          <label className="profile_details-label">Department: </label>{props.EmpCardDetails.empUnit}
        </Typography>
        <Typography variant="body2" component="p" className="profile_details">
          <label className="profile_details-label">Team: </label>{props.EmpCardDetails.empTeam}
        </Typography>
      </Grid>
    </Paper>
  );
}