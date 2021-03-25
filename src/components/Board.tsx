import React, { useState } from "react";
import "./Board.css";

enum Structure {
  Ground,
  FirstLevel,
  SecondLevel,
  ThirdLevel,
  Roof
}

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

interface Pawn {
  player: Player;
}

interface Coordinates {
  row: number;
  column: number;
}
class Cell {
  id: number;
  structure: Structure;
  pawn: Pawn | null;
  coordinates: Coordinates;
  selected: boolean;
  constructor(id: number, coordinates: Coordinates) {
    this.id = id;
    this.structure = 0;
    this.pawn = null;
    this.coordinates = coordinates;
    this.selected = false;
  }
  setPawn(pawn: Pawn | null) {
    this.pawn = pawn;
  }
}
/**
 * Filling a board with a given length with predefined Cell objects
 */
const createBoard = (length: number) => {
  const board = Array(length)
    .fill(0)
    .map((x) => Array(length).fill(0));
  for (let i = 0; i < length; i++) {
    for (let k = 0; k < length; k++) {
      const cell = new Cell(length * i + k, { row: i, column: k });
      board[i][k] = cell;
    }
  }
  return board;
};

interface Props {
  currentPlayer: Player;
}

export const Board: React.FC<Props> = ({ currentPlayer }) => {
  const [length] = useState(5);
  const [board, setBoard] = useState<Cell[][] | [][]>(createBoard(length));
  //   const [boardHistory, setBoardHistory] = useState<Cell[][] | []>([]);
  const handleAction = (cell: Cell) => {
    const tempBoard = [...board];
    cell.setPawn({ player: currentPlayer });
    tempBoard[cell.coordinates.row][cell.coordinates.column] = cell;
    setBoard(tempBoard);
  };
  return (
    <div className="board">
      {board.map((row: any, idx: number) => {
        return (
          <div className="row" key={idx}>
            {row.map((cell: any, idxz: number) => {
              return (
                <div
                  onClick={() => handleAction(cell)}
                  className="cell"
                  key={idx + idxz}
                >
                  {cell.pawn && cell.pawn.player.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
