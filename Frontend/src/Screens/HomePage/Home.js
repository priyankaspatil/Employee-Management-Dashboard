import React from "react";
// import { Redirect } from "react-router-dom";
import {  Paper, Grid } from "@material-ui/core";

const HomePage = () => {
    return (
      <Paper className="floor-map_paper-wrapper">
        <Grid className="floor-map_grid-wrapper">
          <h1 className="floor-map_title">Hi we are on home page :)</h1>
        </Grid>
      </Paper>
    );
}

export default HomePage;