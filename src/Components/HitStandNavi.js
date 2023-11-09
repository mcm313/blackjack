import { Button, Grid, Typography } from "@mui/material";
import { AddBox, PanTool, WidthNormal } from "@mui/icons-material";
import React from "react";

function HitStandNavi({ bet, handleHit, handleStand }) {
  return (
    <Grid
      item
      container
      xs={12}
      alignItems="center"
      textAlign="center"
      padding={3}
    >
      <Grid item xs={4}>
        <Button
          startIcon={<AddBox />}
          onClick={handleHit}
          sx={{
            color: "antiquewhite",
            backgroundColor: "#141220",
            width: "100px",
          }}
        >
          Hit
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Bet ${bet}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          startIcon={<PanTool />}
          onClick={handleStand}
          sx={{
            color: "antiquewhite",
            backgroundColor: "#141220",
            width: "100px",
          }}
        >
          Stand
        </Button>
      </Grid>
    </Grid>
  );
}

export default HitStandNavi;
