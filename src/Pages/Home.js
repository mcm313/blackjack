import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Club from "../Photos/club.png";
import Heart from "../Photos/heart.png";
import Diamond from "../Photos/diamond.png";
import Spade from "../Photos/spade.png";

import "../main.css";

function Home() {
  return (
    <Grid
      container
      className="customMain"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid item container alignItems="center">
        <Grid
          item
          xs={3}
          sx={{ display: "inline-flex", justifyContent: "end" }}
        >
          <img src={Spade} />
          <img src={Diamond} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" textAlign="center">
            <b>Black Jack</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ display: "inline-flex", justifyContent: "start" }}
        >
          <img src={Heart} />
          <img src={Club} />
        </Grid>
      </Grid>
      <br></br>
      <Grid item container justifyContent="center">
        <Link to={"game"}>
          <Button
            variant="contained"
            sx={{ color: "antiquewhite", backgroundColor: "#141220" }}
          >
            Play
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default Home;
