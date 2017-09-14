import { between } from './numbers';
import { replaceChar } from './strings';

export const PIECES = ['♔', '♕', '♖', '♗', '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'];

const PIECE_COLORS = {
  '♔': 'white',
  '♕': 'white',
  '♖': 'white',
  '♗': 'white',
  '♘': 'white',
  '♙': 'white',
  '♚': 'black',
  '♛': 'black',
  '♜': 'black',
  '♝': 'black',
  '♞': 'black',
  '♟': 'black',
};

// Lookup color of piece
export const pieceColor = piece => PIECE_COLORS[piece];

// Boolean if a piece is a pawn of any color
export const isPawn = piece => piece === '♙' || piece === '♟';

// Convert 0 based x, y coordinates into character offset in board string
export const boardLocation = (x, y) => {
  // A
  const xValid = between(0, 7, x);
  const yValid = between(0, 7, y);
  if (xValid && yValid) {
    return y * 8 + x;
  }
  return null;
};

// check each move delta from starting x, y for empty spaces to highlight
// Also mark capture-able pieces blocking movement
const moveReduce = (moves, board, highlights, x, y) => {
  const checkedPiece = board.charAt(boardLocation(x, y));
  return moves.reduce((result, [count, xDelta, yDelta]) => {
    for (let i = 0; i < count; i++) {
      const loc = boardLocation(x + xDelta * (i + 1), y + yDelta * (i + 1));
      if (loc == null) {
        break;
      }
      const currentPiece = board.charAt(loc);
      if (currentPiece === ' ') {
        result = replaceChar(result, loc, 'V');
      } else {
        if (!isPawn(checkedPiece) && pieceColor(currentPiece) !== pieceColor(checkedPiece)) {
          result = replaceChar(result, loc, 'A');
        }
        break;
      }
    }
    return result;
  }, highlights);
};

// Check for highlights along rows and columns
const rowsAndColumns = ({ up, down, left, right }) => (board, highlights, x, y) => {
  const moves = [[up, 0, -1], [down, 0, 1], [left, -1, 0], [right, 1, 0]];
  return moveReduce(moves, board, highlights, x, y);
};

// Check for highlights along diagonals
const diagonals = ({ upRight, downRight, upLeft, downLeft }) => (board, highlights, x, y) => {
  const moves = [[upRight, 1, -1], [downRight, 1, 1], [upLeft, -1, -1], [downLeft, -1, 1]];
  return moveReduce(moves, board, highlights, x, y);
};

// Check for knights hook shaped movement
const knightMoves = (board, highlights, x, y) => {
  const moves = [
    [1, 1, -2],
    [1, -1, -2],
    [1, 2, -1],
    [1, 2, 1],
    [1, 1, 2],
    [1, -1, 2],
    [1, -2, -1],
    [1, -2, 1],
  ];
  return moveReduce(moves, board, highlights, x, y);
};

const pawnAttackLocations = {
  white: [[1, 1], [-1, 1]],
  black: [[1, -1], [-1, -1]],
};

// Pawns move 1 square or 2 squares from their starting location
const pawnMove = (delta, extra) => (board, highlights, x, y) => {
  let loc = boardLocation(x, y + delta);
  if (loc && board.charAt(loc) === ' ') {
    highlights = replaceChar(highlights, loc, 'V');
    if (y === extra) {
      loc = boardLocation(x, y + delta * 2);
      if (loc && board.charAt(loc) === ' ') {
        highlights = replaceChar(highlights, loc, 'V');
      }
    }
  }
  return highlights;
};

const pawnAttackDelta = {
  white: 1,
  black: -1,
};

// Check for en passant attacks
// Only works for a pawn attacking a pawn
// Must be in 3rd or 5th rank depending on color
// Opponent must of just moved 2 spaces with the pawn the turn prior
//   Note - this is requirement is assume to be true since no game is
//          being played
// See https://en.wikipedia.org/wiki/En_passant for more information
const enPassantAttack = (board, highlights, x, y, delta) => {
  const color = pieceColor(board.charAt(boardLocation(x, y)));
  let cp = board.charAt(boardLocation(x - 1, y));
  let loc3 = boardLocation(x - 1, y + delta);
  if (isPawn(cp) && pieceColor(cp) !== color && loc3 && board.charAt(loc3) === ' ') {
    highlights = replaceChar(highlights, loc3, 'A');
  }
  cp = board.charAt(boardLocation(x + 1, y));
  loc3 = boardLocation(x + 1, y + delta);
  if (isPawn(cp) && pieceColor(cp) !== color && loc3 && board.charAt(loc3) === ' ') {
    highlights = replaceChar(highlights, loc3, 'A');
  }
  return highlights;
};

// Pawns attack forward and to each side or via en passant
const pawnAttack = (board, highlights, x, y) => {
  const color = pieceColor(board.charAt(boardLocation(x, y)));
  const moves = pawnAttackLocations[color];
  if (color === 'white' && y === 4) {
    highlights = enPassantAttack(board, highlights, x, y, pawnAttackDelta[color]);
  }
  if (color === 'black' && y === 3) {
    highlights = enPassantAttack(board, highlights, x, y, pawnAttackDelta[color]);
  }
  return moves.reduce((result, [xDelta, yDelta]) => {
    const loc = boardLocation(x + xDelta, y + yDelta);
    if (loc == null) {
      return result;
    }
    const currentPiece = board.charAt(loc);
    if (currentPiece !== ' ' && pieceColor(currentPiece) !== color) {
      return replaceChar(result, loc, 'A');
    }
    return result;
  }, highlights);
};

// Get array of highlighters for each piece type
export const getHighlighters = kind => {
  switch (kind) {
    case '♔':
    case '♚':
      return [
        rowsAndColumns({ up: 1, down: 1, left: 1, right: 1 }),
        diagonals({ upRight: 1, downRight: 1, upLeft: 1, downLeft: 1 }),
      ];

    case '♕':
    case '♛':
      return [
        rowsAndColumns({ up: 7, down: 7, left: 7, right: 7 }),
        diagonals({ upRight: 7, downRight: 7, upLeft: 7, downLeft: 7 }),
      ];

    case '♖':
    case '♜':
      return [rowsAndColumns({ up: 7, down: 7, left: 7, right: 7 })];

    case '♗':
    case '♝':
      return [diagonals({ upRight: 7, downRight: 7, upLeft: 7, downLeft: 7 })];

    case '♘':
    case '♞':
      return [knightMoves];

    case '♙':
      return [pawnMove(1, 1), pawnAttack];

    case '♟':
      return [pawnMove(-1, 6), pawnAttack];

    default:
      return [];
  }
};
