import React from 'react';
import {Button, Grid} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import './AlertModalDialog.css';
import ROUTES from '../../helper/constants';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAgree() {
    props.props.history.push(ROUTES.HomePage);
  }

  return (
    <Grid className="alert_popup-grid">
      <Button color="primary" onClick={handleClickOpen} className="sec__btn">
        Cancel
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="alert-dialog"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent className="alert-dialog_content">
          <DialogContentText id="alert-dialog-description" className="alert-dialog_content-description">
            Once you cancel, your employee details won't be saved. Due to which you won't be able to be mapped on company Floor Map. Are you sure you want cancel ?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="alert-dialog_actions">
          <Button onClick={handleClose} color="primary" className="sec__btn">
            No
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus className="btn">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}