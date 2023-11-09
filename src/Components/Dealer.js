import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";

function Dealer({ dealerHand, totalChecker, onStand }) {
  return (
    <Grid container textAlign="center" padding={3}>
      {onStand ? (
        <>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            {dealerHand.map((card) => (
              <Typography variant="body1">{card.name}</Typography>
            ))}
          </Grid>
          <Grid
            item
            container
            xs={4}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar>{totalChecker(dealerHand)}</Avatar>
            <Typography variant="h6">
              <b>Dealer</b>
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="body1">{dealerHand[1].name}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={4}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar>{dealerHand[1].value}</Avatar>
            <Typography variant="h6">
              <b>Dealer</b>
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dealer;
