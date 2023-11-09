import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function WinnerDialog({ winner, open, bank, handleContinue }) {
  return (
    <Dialog
      open={open}
      // TransitionComponent={Transition}
      keepMounted
    >
      {winner === "You" ? (
        <DialogTitle>You win!</DialogTitle>
      ) : winner === "Push" ? (
        <DialogTitle>Push!</DialogTitle>
      ) : (
        <DialogTitle>Dealer wins!</DialogTitle>
      )}

      <DialogActions>
        {bank <= 0 ? (
          <Link to="/">
            <Button>Continue</Button>
          </Link>
        ) : (
          <Button onClick={handleContinue}>Continue</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default WinnerDialog;
