import React, { useEffect, useState } from "react";
import { Board } from "../components/Board";
import "./Game.css";
enum Color {
  Red = "#660000",
  Green = "#006600",
  Blue = "#000066"
}

class Player {
  name: string;
  color: Color;
  constructor(name: string, color: Color) {
    this.name = name;
    this.color = color;
  }
}
const createPlayers = (): Player[] => {
  const players: Player[] = [];
  const player1: Player = { name: "Colin", color: Color.Red };
  const player2: Player = { name: "Alex", color: Color.Green };
  players.push(player1);
  players.push(player2);
  return players;
};

export const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | any>({});
  const [players] = useState<Player[] | []>(createPlayers());
  useEffect(() => {
    setCurrentPlayer(players[0]);
  }, [players]);
  return (
    <div className="game">
      <header className="game-header">
        <span
          className={
            currentPlayer && players[0].name === currentPlayer.name
              ? "current"
              : ""
          }
        >
          Player 1: {players[0].name}
        </span>
        <span
          className={
            currentPlayer && players[1].name === currentPlayer.name
              ? "current"
              : ""
          }
        >
          Player 2: {players[1].name}
        </span>
      </header>
      <Board currentPlayer={currentPlayer} />
      {currentPlayer ? (
        <footer>Current player is: {currentPlayer.name}</footer>
      ) : (
        <footer>Heyo</footer>
      )}
    </div>
  );
};
