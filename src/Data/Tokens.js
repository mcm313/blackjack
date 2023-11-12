import React from "react";
import { Typography } from "@mui/material";
import "../main.css";

export const Tokens = [
  { value: 1, color: "white" },
  { value: 5, color: "red" },
  { value: 10, color: "blue" },
  { value: 25, color: "green" },
  { value: 100, color: "black" },
  { value: 500, color: "purple" },
  { value: 1000, color: "yellow" },
  { value: 5000, color: "orange" },
  { value: 25000, color: "brown" },
  { value: 100000, color: "lightblue" },
];

export default function Token({ token, handleToken }) {
  return (
    <button
      className="token"
      id={token.color}
      onClick={() => handleToken(token.value)}
    >
      <Typography variant="body1" textAlign="center">
        <b>{token.value}</b>
      </Typography>
    </button>
  );
}
