import React from "react";
// import { Redirect } from "react-router-dom";
import {  Paper, Grid } from "@material-ui/core";
import FloorMapImg from "../../assets/images/front_page-office-layout.jpg";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
import MainScreen from "./MainScreen";
import "./FloorMap.css";
import AddUserDetails from "../../Components/UserDetails/AddUserDetails";

class FloorMapPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showAddEmpDetails: false
    }
}

showAddDetailsComp = (data) => {
  this.setState({
    showAddEmpDetails: data
  })
}

render(){
  return(
      <Paper className="floor-map_paper-wrapper">
      {this.state.showAddEmpDetails ?
        <Grid container className="floor-map_grid-wrapper">
          <img src={FloorMapImg} alt={FloorMapImg} className="floor-map_img"/>
          <Grid item xs className="floor-map_grid-container">
             <AddUserDetails props={this.props}/> 
          </Grid>
        </Grid> :
        <Grid container className="floor-map_grid-wrapper">
          <img src={FloorMapImg} alt={FloorMapImg} className="floor-map_img"/>
          <Grid item xs className="floor-map_grid-container">
            <MainScreen showAddDetailsComp={this.showAddDetailsComp}/>
          </Grid>
        </Grid>}
      </Paper>
    );
  }
}

export default FloorMapPage;