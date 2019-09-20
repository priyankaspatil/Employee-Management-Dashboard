import React from 'react';
import {Paper, Typography, Grid} from '@material-ui/core';
import "../../Components/EmpCard/EmpCard.css";
// import ProfileImage from '../../assets/images/profile_img.jpg';
import EmpCard from '../../Components/EmpCard/EmpCard';
import axios from "axios";

export default function DeskArea(props) {
  console.log("Desk Area Props====>", props);

  const [value, setValue] = React.useState(false);
  console.log("popper value===>", value)

  React.useEffect(() => {
    // let res = await axios.post("http://localhost:3007/getuserdetails");
    // let data = res.data;
    axios({
        method: "GET",
        url: "http://localhost:3007/getuserdetails"
      }).then(data => {
        const result = data.data;
        console.log("DeskArea useEffect response data :", result)
        // { result === "Successful" ? this.props.history.push(ROUTES.HomePage) : console.log("Failed to add user details :(") }
        // console.log("Data successfully registered====>",data.data);
      });
    
    debugger;
  })
  
  return (
    <Grid>
        <Grid style={{display: "flex", flexDirection: "row"}}>
            <Paper className="desk_wrapper-grid" id="100" style={{backgroundColor: "yellow", width: "100px", height:"100px", marginRight: "50px"}} onMouseOver={() => setValue(true)} onMouseOut={() => setValue(false)}></Paper>
            <Paper className="desk_wrapper-grid" id="101" style={{backgroundColor: "blue", width: "100px", height:"100px", marginRight: "50px"}} onMouseOver={() => setValue(true)} onMouseOut={() => setValue(false)}></Paper>
            <Paper className="desk_wrapper-grid" id="102" style={{backgroundColor: "red", width: "100px", height:"100px", marginRight: "50px"}} onMouseOver={() => setValue(true)} onMouseOut={() => setValue(false)}></Paper>
            <Paper className="desk_wrapper-grid" id="103" style={{backgroundColor: "gray", width: "100px", height:"100px", marginRight: "50px"}} onMouseOver={() => setValue(true)} onMouseOut={() => setValue(false)}></Paper>
        </Grid>
      
      {value ? <EmpCard EmpCardDetails={props.EmpCardDetails}/>
        // <Paper className="emp-card_wrapper-grid">
        //     <Grid item xs className="card_img-grid">
        //         <img  src={ProfileImage} alt={'Profile Image'} className='profile_img'/>
        //     </Grid>
        //     <Grid item xs className="emp-content--grid">
        //         <Typography gutterBottom variant="h5" component="h2" className="profile_name">
        //             {props.EmpCardDetails.empName}
        //         </Typography>
        //         <Typography variant="body1" component="p" className="profile_designation">
        //             {props.EmpCardDetails.empDesignation}
        //         </Typography>
        //         <Typography variant="body2" component="p" className="profile_details">
        //             <label className="profile_details-label">Emp ID: </label>{props.EmpCardDetails.empId}
        //         </Typography>
        //         <Typography variant="body2" component="p" className="profile_details">
        //             <label className="profile_details-label">Cost Center: </label>{props.EmpCardDetails.empCostCenter}
        //         </Typography>
        //         <Typography variant="body2" component="p" className="profile_details">
        //             <label className="profile_details-label">Department: </label>{props.EmpCardDetails.empUnit}
        //         </Typography>
        //         <Typography variant="body2" component="p" className="profile_details">
        //             <label className="profile_details-label">Team: </label>{props.EmpCardDetails.empTeam}
        //         </Typography>
        //     </Grid>
        // </Paper>
      : null}
    </Grid>
  );
}
