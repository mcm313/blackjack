import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";

function Player({ playerHand, totalChecker }) {
  return (
    <Grid container textAlign="center" padding={3}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        {playerHand.map((card) => (
          <Typography variant="body1">{card.name}</Typography>
        ))}
      </Grid>
      <Grid item container xs={4} justifyContent="center" alignItems="center">
        <Avatar>{totalChecker(playerHand)}</Avatar>
        <Typography variant="h6">
          <b>Player</b>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Player;
