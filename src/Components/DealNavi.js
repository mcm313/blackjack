import { Button, Grid, Typography } from "@mui/material";
import React from "react";

function DealNavi({ bet, handleDeal }) {
  return (
    <Grid item container xs={12} textAlign="center" padding={3}>
      <Grid item xs={4}>
        <Button sx={{ width: "100px" }}></Button>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body1">Bet ${bet}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={handleDeal}
          sx={{
            color: "antiquewhite",
            backgroundColor: "#141220",
            width: "100px",
          }}
        >
          Deal
        </Button>
      </Grid>
    </Grid>
  );
}

export default DealNavi;
