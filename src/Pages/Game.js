import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Deck } from "../Data/Deck";
import cards from "../Photos/cards.png";

import Player from "../Components/Player";
import Dealer from "../Components/Dealer";
import WinnerDialog from "../Components/WinnerDialog";
import Bank from "../Components/Bank";
import DealNavi from "../Components/DealNavi";
import HitStandNavi from "../Components/HitStandNavi";

import "../main.css";

function Game() {
  const copyDeck = [...Deck];

  const [onPlayDeck, setOnPlayDeck] = useState(copyDeck);
  const [bank, setBank] = useState(1900);
  const [bet, setBet] = useState(100);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [onPlay, setOnplay] = useState(false);
  const [onStand, setOnStand] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [winner, setWinner] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    calculateWinner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHand, endGame]);

  const handleToken = (value) => {
    const updateBet = bet + value;
    const updateBank = bank - value;
    setBet(updateBet);
    setBank(updateBank);
  };

  const handleClear = (value) => {
    const updatedBet = bet - value;
    const updatedBank = bank + value;
    setBet(updatedBet);
    setBank(updatedBank);
  };

  const randomCard = () => {
    const updatedPlayDeck = onPlayDeck;
    const randomIndex = Math.floor(Math.random() * onPlayDeck.length);
    const card = updatedPlayDeck[randomIndex];
    updatedPlayDeck.splice(randomIndex, 1);
    setOnPlayDeck(updatedPlayDeck);
    return card;
  };

  const totalChecker = (hand) => {
    let totalValue = 0;
    hand.forEach((card) => {
      totalValue = totalValue + card.value;
    });
    if (hand.some((card) => card.type === "Ace") && totalValue < 12) {
      totalValue = totalValue + 10;
    }
    return totalValue;
  };

  const handleDeal = () => {
    if (bet === 0) {
      return;
    }
    setPlayerHand([...playerHand, randomCard(), randomCard()]);
    setDealerHand([...dealerHand, randomCard(), randomCard()]);
    setOnplay(true);
    setDrawerOpen(false);
  };

  const handleHit = () => {
    if (totalChecker(playerHand) > 22) {
      return;
    }
    setPlayerHand([...playerHand, randomCard()]);
  };

  const handleStand = () => {
    setOnStand(true);
    let newDealerHand = dealerHand;
    while (
      totalChecker(newDealerHand) < 17 &&
      totalChecker(playerHand) > totalChecker(newDealerHand)
    ) {
      newDealerHand = [...newDealerHand, randomCard()];
    }
    setDealerHand(newDealerHand);
    setEndGame(true);
  };

  console.log("hello");

  const handleContinue = () => {
    setOnPlayDeck(copyDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setOnplay(false);
    setOnStand(false);
    setEndGame(false);
    setWinner("");
    setDialogOpen(false);
    setDrawerOpen(true);
  };

  const handleWin = () => {
    let updatedBet = bet * 2;
    if (totalChecker(playerHand) === totalChecker(dealerHand)) {
      updatedBet = bet;
    }
    const updatedBank = bank + updatedBet - 100;
    setBank(updatedBank);
    setBet(100);
  };

  const handleLost = () => {
    const updatedBank = bank - 100;
    setBank(updatedBank);
    setBet(100);
  };

  const calculateWinner = () => {
    if (totalChecker(playerHand) === 21 && !endGame) {
      setOnStand(true);
      let newDealerHand = dealerHand;
      while (
        totalChecker(newDealerHand) < 17 &&
        totalChecker(playerHand) > totalChecker(newDealerHand)
      ) {
        newDealerHand = [...newDealerHand, randomCard()];
      }
      setDealerHand(newDealerHand);
      setEndGame(true);
    } else if (totalChecker(playerHand) > 21) {
      setOnStand(true);
      setWinner("Dealer");
      setDialogOpen(true);
      handleLost();
    } else if (totalChecker(dealerHand) > 21 && endGame) {
      setWinner("You");
      setDialogOpen(true);
      handleWin();
    } else if (
      totalChecker(playerHand) === totalChecker(dealerHand) &&
      endGame
    ) {
      setWinner("Push");
      setDialogOpen(true);
      handleWin();
    } else if (totalChecker(playerHand) < totalChecker(dealerHand) && endGame) {
      setWinner("Dealer");
      setDialogOpen(true);
      handleLost();
    } else if (totalChecker(playerHand) > totalChecker(dealerHand) && endGame) {
      setWinner("You");
      setDialogOpen(true);
      handleWin();
    }
  };

  return (
    <Grid
      container
      className="customMain"
      alignItems="start"
      p={3}
      overflow="hidden"
    >
      <Grid
        item
        xs={12}
        sx={{ display: "inline-flex" }}
        justifyContent="end"
        alignItems="center"
      >
        <Typography variant="body1">{onPlayDeck.length}</Typography>
        <img src={cards} width="45px" alt="cards" />
      </Grid>
      <Grid item xs={12}>
        {onPlay && (
          <Dealer
            dealerHand={dealerHand}
            totalChecker={totalChecker}
            onStand={onStand}
          />
        )}
      </Grid>
      {!onPlay ? (
        <DealNavi bet={bet} handleDeal={handleDeal} />
      ) : (
        <HitStandNavi
          bet={bet}
          handleHit={handleHit}
          handleStand={handleStand}
        />
      )}
      <Grid item xs={12}>
        {onPlay && (
          <Player playerHand={playerHand} totalChecker={totalChecker} />
        )}
      </Grid>
      <Bank
        bank={bank}
        bet={bet}
        handleToken={handleToken}
        handleClear={handleClear}
        open={drawerOpen}
      />
      <WinnerDialog
        winner={winner}
        open={dialogOpen}
        bank={bank}
        handleContinue={handleContinue}
      />
    </Grid>
  );
}

export default Game;
