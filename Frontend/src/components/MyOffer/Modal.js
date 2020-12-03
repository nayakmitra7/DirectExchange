import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
class Modal extends Component {
  state = {};
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Modify Your Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.props.dialogtext}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Offer Amount"
            type="number"
            fullWidth
            value={this.props.value}
            disabled
            // onChange={(e) => {
            //   this.setState({ modifiedAmount: e.target.value });
            // }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={this.props.confirmAction} color="primary">
            {this.props.confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
