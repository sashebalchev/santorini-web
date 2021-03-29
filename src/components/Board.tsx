import React, { useState } from "react";
import { actionDirections, possibleDirections } from "../board.ts/board";
import { useAppDispatch } from "../common/hooks";
import { setGameState } from "../store/gameStateSlice";
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
enum GameStates {
  SetStartPosition,
  SelectPawn,
  MovePawn,
  BuildStructure
}
class Cell {
  id: number;
  structure: Structure;
  pawn: Pawn | null;
  coordinates: Coordinates;
  selected: boolean;
  highlighted: boolean;
  constructor(id: number, coordinates: Coordinates) {
    this.id = id;
    this.structure = 0;
    this.pawn = null;
    this.coordinates = coordinates;
    this.selected = false;
    this.highlighted = false;
  }
  setPawn(pawn: Pawn | null) {
    this.pawn = pawn;
  }
  setSelected(selected: boolean) {
    this.selected = selected;
  }
  setHighlighted(highlighted: boolean) {
    this.highlighted = highlighted;
  }
}
/**
 * Filling a board with a given length with predefined Cell objects
 */
const createBoard = (boardLength: number) => {
  const board = Array(boardLength)
    .fill(0)
    .map((x) => Array(boardLength).fill(0));
  for (let i = 0; i < boardLength; i++) {
    for (let k = 0; k < boardLength; k++) {
      const cell = new Cell(boardLength * i + k, { row: i, column: k });
      board[i][k] = cell;
    }
  }
  return board;
};
/**
 * This will be used to create 5 x 5 grid board
 */
const BOARD_LENGTH = 5;

const drawElements = (cell: Cell): JSX.Element => {
  const elements: JSX.Element[] = [
    <div className="first-level structure"></div>,
    <div className="second-level structure"></div>,
    <div className="third-level structure"></div>,
    <div className="roof structure"></div>
  ];
  elements.splice(cell.structure, elements.length);
  cell.selected && elements.push(<div className="pawn"></div>);
  return <>{elements}</>;
};
interface Props {
  currentPlayer: Player;
}

export const Board: React.FC<Props> = ({ currentPlayer }) => {
  const [board, setBoard] = useState<Cell[][] | [][]>(
    createBoard(BOARD_LENGTH)
  );
  //   const [boardHistory, setBoardHistory] = useState<Cell[][] | []>([]);

  const handleAction = (cell: Cell) => {
    const tempBoard = [...board];
    if (!cell.selected) {
      const directions = possibleDirections(actionDirections(5), cell.id);
      cell.setPawn({ player: currentPlayer });
      cell.setSelected(true);
      tempBoard[cell.coordinates.row][cell.coordinates.column] = cell;
      tempBoard.forEach((row: Cell[]) => {
        row.forEach((newCell: Cell) => {
          for (let index = 0; index < directions.length; index++) {
            if (newCell.id === cell.id + directions[index]) {
              newCell.setHighlighted(true);
            }
          }
        });
      });
    } else if (cell.selected) {
      tempBoard.forEach((row: Cell[]) => {
        row.forEach((newCell: Cell) => {
          newCell.setSelected(false);
          newCell.setHighlighted(false);
        });
      });
    }
    changeState();
    setBoard(tempBoard);
  };

  // const gameState = useAppSelector((state) => state.gameState.value);
  const dispatch = useAppDispatch();
  //   dispatch({ type: "setGameState", payload: GameState.MovePawn });
  const changeState = () => {
    dispatch(setGameState(GameStates.MovePawn));
  };
  return (
    <div className="board">
      {board.map((row: any, idx: number) => {
        return (
          <div className="row" key={idx + "row"}>
            {row.map((cell: any, idxz: number) => {
              return (
                <div
                  onClick={() => handleAction(cell)}
                  className={`cell ${cell.highlighted ? "highlighted" : ""}`}
                  key={idx + idxz + "cell"}
                >
                  {!cell.structure ? drawElements(cell) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
