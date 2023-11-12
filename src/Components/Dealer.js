import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import Card from "./Card";

function Dealer({ dealerHand, totalChecker, onStand }) {
  const backCard = {
    suit: "",
    type: "back",
    name: "",
    value: 0,
  };

  return (
    <Grid container textAlign="center" padding={3}>
      {onStand ? (
        <>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            {dealerHand.map((card, i) => (
              <Card card={card} index={i} />
            ))}
          </Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
          >
            <Avatar>{totalChecker(dealerHand)}</Avatar>
            <Typography variant="body1">
              <b>Dealer</b>
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={3}></Grid>
          <Grid
            item
            xs={6}
            display="inline-flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Card card={backCard} index={0} />
            <Card card={dealerHand[1]} index={1} />
          </Grid>
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignItems="center"
          >
            {dealerHand[1].type === "Ace" ? (
              <Avatar>11</Avatar>
            ) : (
              <Avatar>{dealerHand[1].value}</Avatar>
            )}

            <Typography variant="body1">
              <b>Dealer</b>
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dealer;
