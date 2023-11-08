import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Typography variant="h1">Black Jack</Typography>
      <Link to={"game"}>
        <Button>Play</Button>
      </Link>
    </>
  );
}

export default Home;
