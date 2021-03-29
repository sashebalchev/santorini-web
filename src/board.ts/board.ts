import { toBinary } from "./../common";
/**
 * This file will contain the different
 * bitboards that represent the current
 * state of the board.
 *
 * Also includes modified FEN-representation
 * for quick setup of games and game history implementation.
 */

// FEN logic
/**
 * f - First level structure
 * s - Second level structure
 * t - Third level structure
 * r - Roof structure
 * p - First player pawn
 * P - Second player pawn
 * 1~5 - Empty cells
 * / - Separator between rows
 *
 * Interpretation:
 * The modified FEN for Santorini
 * follows the same principles as the
 * Forsyth–Edwards Notation for chess
 * but modified to fit the particular needs.
 * It is a single line string divided into
 * four (4) sections and using the notations above:
 *
 * 1. Structure placement: This part describes
 * how the structures should be placed. It is separated
 * in 5 subsections denoting the rows of the board starting
 * from the top left. Each structure uses the letter
 * associated with it. Numbers from 1 to 5 denote
 * the number of spaces without structures in
 * the given row.
 *
 * 2. Active player - "p" - first player moves next,
 * "P" - second player moves next.
 *
 * 3. First player pawn positions - cell (separator 'p') second cell;
 * Cell is counted from 1 to 25 starting from the top left
 * and going down each row, starting from the left (e.g. reading an English book)
 *
 * 4. Second player pawn positions - cell (separator 'P') second cell;
 * Same logic applies.
 *
 * Example:
 * 2ff1/1ssst/4t/3ff/1ssf1 p 4p13 5P20
 * Parsed board below
 */
//  +--+---+---+----+----+
//  |  |   | f | fp | P  |
//  +--+---+---+----+----+
//  |  | s | s | s  | t  |
//  +--+---+---+----+----+
//  |  |   | p |    | t  |
//  +--+---+---+----+----+
//  |  |   |   | f  | fP |
//  +--+---+---+----+----+
//  |  | s | s | f  |    |
//  +--+---+---+----+----+

export enum Edge {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

/**
 * Creates bit board for an edge
 */

export const createEdge = (squareLength: number, edge: Edge): number => {
  let createdEdge: number = 0;
  for (let index = 0; index < squareLength; index++) {
    let mask: number;
    switch (edge) {
      case Edge.TOP:
        mask = 1 << index;
        createdEdge |= mask;
        break;
      case Edge.RIGHT:
        mask = 1 << ((index + 1) * squareLength - 1);
        createdEdge |= mask;
        break;
      case Edge.BOTTOM:
        mask = 1 << (squareLength * (squareLength - 1) + index);
        createdEdge |= mask;
        break;
      case Edge.LEFT:
        mask = 1 << (squareLength * index);
        createdEdge |= mask;
        break;
      default:
        break;
    }
  }
  return createdEdge;
};

/**
 * Returns the bitboard representation
 * of the given cell index. [0~n]
 * Zero-indexed
 */
const getMask = (index: number): number => {
  return 1 << index;
};

/**
 * Checks if a given cell is on a given edge.
 * Returns true or false
 */
export const checkIfCellIsOnEdge = (
  cellIndex: number,
  edge: number
): boolean => {
  let cellBitPos = getMask(cellIndex);
  return (cellBitPos & edge) === cellBitPos;
};

/**
 * Returns a list of the possible directions
 * for a given square length.
 */
export const actionDirections = (squareLength: number): number[] => {
  return [
    -squareLength - 1,
    -squareLength,
    -squareLength + 1,
    -1,
    0,
    1,
    squareLength - 1,
    squareLength,
    squareLength + 1
  ];
};

/**
 * Given the possible directions do an action
 * relative to the given square length and also the
 * selected cell with a given zero index it returns
 * a list with only the allowed possible actions.
 */

export const possibleDirections = (
  actionDirections: number[],
  cellIndex: number
): number[] => {
  const possibleDirections: number[] = [];
  let allDirectionsMask = 0b111101111;
  if (checkIfCellIsOnEdge(cellIndex, createEdge(5, Edge.TOP))) {
    allDirectionsMask &= 0b111101000;
  }
  if (checkIfCellIsOnEdge(cellIndex, createEdge(5, Edge.RIGHT))) {
    allDirectionsMask &= 0b011001011;
  }
  if (checkIfCellIsOnEdge(cellIndex, createEdge(5, Edge.BOTTOM))) {
    allDirectionsMask &= 0b000101111;
  }
  if (checkIfCellIsOnEdge(cellIndex, createEdge(5, Edge.LEFT))) {
    allDirectionsMask &= 0b110100110;
  }
  const stringifiedReversedMask: string[] = toBinary(allDirectionsMask, 9)
    .split("")
    .reverse();
  for (let index = 0; index < 9; index++) {
    if (stringifiedReversedMask[index] === "1") {
      possibleDirections.push(actionDirections[index]);
    }
  }
  return possibleDirections;
};

// Bit board class

class BitBoard {
  rows: number;
  cols: number;
  constructor() {
    this.rows = 5;
    this.cols = 5;
  }
  getMask = (index: number) => {
    return 1 << index;
  };
}

// First layer bitboard

// Second layer bitboard

// Third level bitboard

// Roof level bitboard

// Pawn first player bitboard

const setFirstPlayerState = (place: number, bitboard?: number) => {};

// Pawn player B bitboard

export { };

// class Board {
//   constructor() {
//     // dimensions
//     this.rows = 3;
//     this.cols = 3;

//     // boards
//     this.x_player = 0b000000000;
//     this.o_player = 0b000000000;
//     this.full_board = 0b111111111;

//     // win conditions
//     this.win_conditions = [
//       0b111000000,
//       0b000111000,
//       0b000000111,
//       0b100100100,
//       0b010010010,
//       0b001001001,
//       0b100010001,
//       0b001010100
//     ];
//   }

//   maskOf(idx) {
//     return 1 << idx;
//   }

//   playX(idx) {
//     let mask = this.maskOf(idx);
//     this.x_player |= mask;
//   }

//   playO(idx) {
//     let mask = this.maskOf(idx);
//     this.o_player |= mask;
//   }

//   fillX(...idxs) {
//     for (let idx of idxs) {
//       this.playX(idx);
//     }
//   }

//   fillO(...idxs) {
//     for (let idx of idxs) {
//       this.playO(idx);
//     }
//   }

//   reset() {
//     this.x_player = 0b000000000;
//     this.o_player = 0b000000000;
//   }

//   print() {
//     for (let y = 0; y < this.rows; y++) {
//       let row = ["|"];
//       for (let x = 0; x < this.cols; x++) {
//         // compute mask
//         let mask = this.maskOf(x + y * this.cols);

//         // values for player x
//         if (this.x_player & mask) {
//           row.push(" X |");
//           continue;
//         }

//         // values for player o
//         if (this.o_player & mask) {
//           row.push(" O |");
//           continue;
//         }

//         // empty
//         row.push("   |");
//       }
//       console.log("|---|---|---|");
//       console.log(row.join(""));
//     }
//     console.log("|---|---|---|");
//     console.log();
//   }

//   printState() {
//     for (let condition of this.win_conditions) {
//       // check if x wins
//       if ((this.x_player & condition) == condition) {
//         console.log("X Won");
//         return;
//       }

//       // check if o wins
//       if ((this.o_player & condition) == condition) {
//         console.log("O Won");
//         return;
//       }
//     }

//     // check draws
//     if ((this.x_player | this.o_player) == this.full_board) {
//       console.log("Draw");
//       return;
//     }

//     // game in progress
//     console.log("In progress");
//   }
// }

// let board = new Board();

// function run(board, xs, os) {
//   board.reset();
//   board.fillX(...xs);
//   board.fillO(...os);
//   board.printState();
//   board.print();
// }

// // X wins
// run(board, [0, 1, 2], [3, 5, 8]);

// // O wins
// run(board, [1, 2, 5], [0, 4, 8]);

// // Draw
// run(board, [2, 3, 4, 8], [0, 1, 5, 6, 7]);

// // In progress
// run(board, [1, 3, 5, 6], [0, 2, 4, 7]);
