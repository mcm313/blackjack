import React, { useState } from "react";
import { Tokens } from "../Data/Tokens";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const drawerHeight = 200;

const openedMixin = (theme) => ({
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
  height: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    height: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: drawerHeight,
  flexShrink: 0,
  whiteSpace: "nowrap",
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
  const showedTokens = Tokens.filter((token) => token <= bank);

  return (
    <Drawer variant="permanent" anchor="bottom" open={open}>
      <Grid Container>
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
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "#141220", minHeight: "200" }}
        >
          {bank > 0 ? (
            <Button onClick={() => handleToken(bank)}>ALL IN</Button>
          ) : (
            <Button onClick={() => handleClear(bet)}>CLEAR BET</Button>
          )}
          <br></br>
          <br></br>
          {showedTokens.map((token) => (
            <Button onClick={() => handleToken(token)}>{token}</Button>
          ))}
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Bank;
