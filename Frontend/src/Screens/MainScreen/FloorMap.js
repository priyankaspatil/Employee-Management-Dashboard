import React from "react";
// import { Redirect } from "react-router-dom";
import {  Paper, Grid } from "@material-ui/core";
import FloorMap from "../../assets/images/front-page-office-layout.jpg";
// import Register from "../Register/Register";
import Login from "../Login/Login";
import "./FloorMap.css";

const MainScreen = () => {
    return (
      <Paper className="floor-map_paper-wrapper">
        <Grid className="floor-map_grid-wrapper">
          <h1 className="floor-map_title">Portal</h1>
          <Grid className="floor-map_grid-container">
              <Grid className="floor-map_grid">
                  <Grid className="floor-map_img-grid">
                      <img src={FloorMap} alt={FloorMap} />
                  </Grid>
              </Grid>
              <Login />
              {/* <Register /> */}
          </Grid>
        </Grid>
      </Paper>
    );
}

export default MainScreen;