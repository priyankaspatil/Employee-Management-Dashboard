import React from "react";
// import { Redirect } from "react-router-dom";
import {  Paper, Grid } from "@material-ui/core";
import FloorMap from "../../assets/images/front_page-office-layout.jpg";
// import Register from "../Register/Register";
// import Login from "../Login/Login";
import MainScreen from "./MainScreen";
import "./FloorMap.css";

const FloorMapPage = (props) => {
    return (
      <Paper className="floor-map_paper-wrapper">
        <Grid container className="floor-map_grid-wrapper">
          <img src={FloorMap} alt={FloorMap} className="floor-map_img"/>
          <Grid item xs className="floor-map_grid-container">
            <MainScreen props={props}/>
          </Grid>
        </Grid>
      </Paper>
    );
}

export default FloorMapPage;