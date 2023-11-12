import React from "react";
import Token, { Tokens } from "../Data/Tokens";
import { Button, Grid, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const drawerHeight = 290;

const openedMixin = (theme) => ({
  minWidth: "450px",
  height: drawerHeight,
  transition: theme.transitions.create("height", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowY: "hidden",
  backgroundColor: "transparent",
  color: "antiquewhite",
  border: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("height", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowY: "hidden",
  backgroundColor: "transparent",
  color: "antiquewhite",
  border: "none",
  minWidth: "450px",
  height: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    height: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  minWidth: "450px",
  height: drawerHeight,
  whiteSpace: "wrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Bank({ bank, bet, handleToken, handleClear, open }) {
  const showedTokens = Tokens.filter((token) => token.value <= bank);

  return (
    <Drawer variant="permanent" anchor="bottom" open={open}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid
            item
            xs={4}
            textAlign="center"
            padding={2}
            sx={{ backgroundColor: "#141220" }}
          >
            <Typography variant="body1">
              <b>Bank</b> ${bank}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} sx={{ backgroundColor: "#141220" }}>
          <Grid item xs={4} textAlign="center">
            {bank > 0 ? (
              <Button onClick={() => handleToken(bank)}>ALL IN</Button>
            ) : (
              <Button onClick={() => handleClear(bet)}>CLEAR BET</Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "inline-flex",
              flexWrap: "wrap",
              height: "200px",
            }}
          >
            {showedTokens.map((token) => (
              <Token token={token} handleToken={handleToken} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Bank;
