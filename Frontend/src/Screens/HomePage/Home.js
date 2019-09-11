import React from "react";
// import { Redirect } from "react-router-dom";
import {  Paper, Grid } from "@material-ui/core";
import EmpCard from "../../Components/EmpCard/EmpCard";
import "./Home.css";

const HomePage = (props) => {
  console.log("HOME PAGE PROPS====>", props.location.state);
    return (
      <Paper className="home-page_paper-wrapper">
        <Grid className="home-page_grid-wrapper">
          {/* <h1 className="home-page_title">Hi we are on home page :)</h1> */}
          <EmpCard EmpCardDetails={props.location.state}/>
        </Grid>
      </Paper>
    );
}

export default HomePage;