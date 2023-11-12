import React from "react";
import "../main.css";
import { Grid, Paper, Typography } from "@mui/material";

import Club from "../Photos/club.png";
import Heart from "../Photos/heart.png";
import Diamond from "../Photos/diamond.png";
import Spade from "../Photos/spade.png";
import Jack from "../Photos/jack.png";
import Queen from "../Photos/queen.png";
import King from "../Photos/king.png";
import Back from "../Photos/back.png";
import { motion } from "framer-motion";

export default function Card({ card, index }) {
  let suitImg = Club;

  if (card.suit === "Spades") {
    suitImg = Spade;
  } else if (card.suit === "Diamonds") {
    suitImg = Diamond;
  } else if (card.suit === "Hearts") {
    suitImg = Heart;
  } else {
    suitImg = Club;
  }

  const PaperMotion = motion(Paper);

  const cardVariants = {
    initial: { opacity: 0, x: "-10rem" },
    animate: { opacity: 1, x: "0" },
  };

  return (
    <PaperMotion
      className="card"
      elevation={3}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ type: "spring", duration: index + 0.5 * 0.5 }}
      layout
    >
      {card.type === "back" ? (
        <Grid container xs={12} justifyContent="center" alignContent="center">
          <img src={Back} alt="card" width="75px" height="75px" />
        </Grid>
      ) : (
        <Grid container>
          <Grid
            item
            container
            display="flex"
            flexDirection="column"
            alignContent="start"
            paddingLeft={0.5}
          >
            <Typography variant="h6">
              {card.type === "Ace" ? (
                <b>A</b>
              ) : card.type === "Jack" ? (
                <b>J</b>
              ) : card.type === " Queen" ? (
                <b>Q</b>
              ) : card.type === "King" ? (
                <b>K</b>
              ) : (
                <b>{card.value}</b>
              )}
            </Typography>
            <img src={suitImg} alt="card" width="20px" height="20px" />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="end"
            justifyContent="center"
            paddingBottom={0.5}
          >
            {card.type === "Jack" ? (
              <img src={Jack} alt="card" width="91px" height="80px" />
            ) : card.type === " Queen" ? (
              <img src={Queen} alt="card" width="91px" height="80px" />
            ) : card.type === "King" ? (
              <img src={King} alt="card" width="91px" height="80px" />
            ) : (
              <img src={suitImg} alt="card" width="75px" height="75px" />
            )}
          </Grid>
        </Grid>
      )}
    </PaperMotion>
  );
}
