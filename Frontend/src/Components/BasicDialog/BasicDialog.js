import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

const BasicDialog = props => {
  return (
    <Dialog
      className="dialogbox__wrapper"
      open={props.isOpen}
      onClose={props.handleCloseEvent}
      area-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {props.modalTitle && (
        <DialogTitle id="alert-dialog-title">{props.modalTitle}</DialogTitle>
      )}
      {props.modalContent && (
        <DialogContent
          className={props.contentClassname ? props.contentClassname : ""}
        >
          <DialogContentText id="alert-dialog-description">
            {props.modalContent}
          </DialogContentText>
        </DialogContent>
      )}
      {props.parserModalContent && (
        <DialogContent>
          <DialogContentText>
            {props.parserModalContent}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions className="btn-wrapper">
        {props.modalCancelButtonText && (
          <Button
            onClick={props.modalCancelEvent}
            className="primary-btn"
            color="primary"
            disabled={props.disabledCancel}
          >
            {props.modalCancelButtonText}
          </Button>
        )}
        <Button
          onClick={props.modalOkEvent}
          className="primary-btn"
          color="primary"
          disabled={props.disabled}
          //autoFocus
        >
          {props.modalOkButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
