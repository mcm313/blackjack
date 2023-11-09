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
      <Grid item container justifyContent="center" alignItems="center">
        <img src={Spade} />
        <img src={Diamond} />
        <Typography variant="h1" textAlign="center">
          <b>Black Jack</b>
        </Typography>
        <img src={Heart} />
        <img src={Club} />
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
