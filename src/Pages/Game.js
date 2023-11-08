import React, { useEffect, useState } from "react";
import Back from "../Photos/back.png";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Deck } from "../Data/Deck";
import { Tokens } from "../Data/Tokens";
import { Link } from "react-router-dom";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    calculateWinner();
  }, [playerHand, endGame]);

  const showedTokens = Tokens.filter((token) => token <= bank);

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
    setPlayerHand([...playerHand, randomCard(), randomCard()]);
    setDealerHand([...dealerHand, randomCard(), randomCard()]);
    setOnplay(true);
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

  const handleContinue = () => {
    setOnPlayDeck(copyDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setOnplay(false);
    setOnStand(false);
    setEndGame(false);
    setWinner("");
    setOpen(false);
  };

  const handleWin = () => {
    const updatedBet = bet * 2;
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
      setOpen(true);
      handleLost();
    } else if (totalChecker(dealerHand) > 21 && endGame) {
      setWinner("You");
      setOpen(true);
      handleWin();
    } else if (
      totalChecker(playerHand) === totalChecker(dealerHand) &&
      endGame
    ) {
      setWinner("Push");
      setOpen(true);
      handleWin();
    } else if (totalChecker(playerHand) < totalChecker(dealerHand) && endGame) {
      setWinner("Dealer");
      setOpen(true);
      handleLost();
    } else if (totalChecker(playerHand) > totalChecker(dealerHand) && endGame) {
      setWinner("You");
      setOpen(true);
      handleWin();
    }
  };

  return (
    <>
      <CardMedia component="img" sx={{ width: 50 }} image={Back} alt="deck" />
      <Typography variant="body1">{onPlayDeck.length}</Typography>
      <br></br>
      <br></br>
      {!onPlay ? (
        <>
          <Typography variant="body1">Bank</Typography>
          <Typography variant="body1">{bank}</Typography>
          <br></br>
          {bank > 0 ? (
            <Button onClick={() => handleToken(bank)}>ALL IN</Button>
          ) : (
            <Button onClick={() => handleClear(bet)}>CLEAR BET</Button>
          )}
          <br></br>
          <br></br>
          <Typography variant="body1">Bet</Typography>
          <Typography variant="body1">{bet}</Typography>
          <br></br>
          {showedTokens.map((token) => (
            <Button onClick={() => handleToken(token)}>{token}</Button>
          ))}
          <br></br>
          <Button onClick={handleDeal}>Deal</Button>
        </>
      ) : (
        <>
          <Typography variant="body1">Bank</Typography>
          <Typography variant="body1">{bank}</Typography>
          <br></br>
          <Typography variant="body1">Bet</Typography>
          <Typography variant="body1">{bet}</Typography>
          <br></br>
          <Button onClick={handleHit}>Hit</Button>
          <Button onClick={handleStand}>Stand</Button>
        </>
      )}
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="body1">Player</Typography>
      {onPlay && (
        <>
          <Typography variant="caption">{totalChecker(playerHand)}</Typography>
          {playerHand.map((card) => (
            <Typography variant="body1">{card.name}</Typography>
          ))}
        </>
      )}
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="body1">Dealer</Typography>
      {onPlay && (
        <>
          {onStand ? (
            <>
              <Typography variant="caption">
                {totalChecker(dealerHand)}
              </Typography>
              {dealerHand.map((card) => (
                <Typography variant="body1">{card.name}</Typography>
              ))}
            </>
          ) : (
            <>
              <Typography variant="caption">{dealerHand[1].value}</Typography>
              <Typography variant="body1">{dealerHand[1].name}</Typography>
            </>
          )}
        </>
      )}
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
      >
        {winner === "You" ? (
          <DialogTitle>You win!</DialogTitle>
        ) : winner === "Push" ? (
          <DialogTitle>Push!</DialogTitle>
        ) : (
          <DialogTitle>Dealer wins!</DialogTitle>
        )}

        <DialogActions>
          {bank <= 0 ? (
            <Link to="/">
              <Button>Continue</Button>
            </Link>
          ) : (
            <Button onClick={handleContinue}>Continue</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Game;
