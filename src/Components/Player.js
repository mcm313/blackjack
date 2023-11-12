import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import Card from "./Card";

function Player({ playerHand, totalChecker }) {
  return (
    <Grid container textAlign="center" padding={3}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        {playerHand.map((card, i) => (
          <Card card={card} index={i} />
        ))}
      </Grid>
      <Grid item container xs={3} justifyContent="center" alignItems="center">
        <Avatar>{totalChecker(playerHand)}</Avatar>
        <Typography variant="body1">
          <b>Player</b>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Player;
