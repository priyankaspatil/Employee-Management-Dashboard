import React from "react";
import { TextField, Grid } from "@material-ui/core";

const FormInput = props => {
  return (
    <Grid className="form__input-grid">
      {/* <label>{props.label}</label>:{" "} */}
      {/* <input name={props.name} onChange={props.onChange} value={props.value} type={props.type} placeholder={props.placeholder} className="form-control"/> */}
      <TextField name={props.name} onChange={props.onChange} value={props.value} type={props.type} label={props.label} placeholder={props.placeholder} margin="normal" className="form__input"/>
    </Grid>
  );
};

export default FormInput;