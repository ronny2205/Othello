
const EMPTY_SQUARE = '';
const MIN_INDEX = 0;
const MAX_INDEX = 7;


// Gets the coordinates of all the squares around the desired square that the player can potentially move towards
const getCoordinatesAroundSquare = (grid, row, column, oponentColor) => {

  const potentialCoordinatesAroundSquare = [
    [row, column+1],
    [row+1, column+1],
    [row+1, column],
    [row+1, column-1],
    [row, column-1],
    [row-1, column-1],
    [row-1, column],
    [row-1, column+1]
  ];

  const coordinatesAroundSquare = potentialCoordinatesAroundSquare.filter(coordinates => {
    const row = coordinates[0],
          column = coordinates[1];
    // Eliminate squares that are outside of board, empty squares and sqaures with same color of current player
    if (validateCoordinatesInBoard(row, column) && grid[row][column] === oponentColor) {
      return coordinates;
    }
  });
  return coordinatesAroundSquare;
}

// Check wehther a square is on the board
const validateCoordinatesInBoard = (row, column) => {
  return (row <= MAX_INDEX && row >= MIN_INDEX && column <= MAX_INDEX && column >= MIN_INDEX);
}

// Find all the squares that have to be changed
const findSquaresToChange = (grid, row, column, coordinatesAroundSquare, currentPlayerColor) => {
  let finalSquaresToFlip = [];

  coordinatesAroundSquare.forEach((coordinates) => {
  
    const nextSquareRow = coordinates[0];
    const nextSquareCol = coordinates[1];
    const rowDiff = nextSquareRow - row;
    const colDiff = nextSquareCol - column;

    // Looking for the next square with the current player's color
    const potentialSquaresToFlip = [
     [nextSquareRow, nextSquareCol]
    ];
    let i = nextSquareRow + rowDiff;
    let j = nextSquareCol + colDiff;
    //let foundSameColorSquare = false;
    let foundEmptySquare = false;
    while (i <= MAX_INDEX && i >= MIN_INDEX && j <= MAX_INDEX && j >= MIN_INDEX && !foundEmptySquare) {
      if (grid[i][j] === currentPlayerColor) {
        finalSquaresToFlip = finalSquaresToFlip.concat(potentialSquaresToFlip);
        break;
      } else if (grid[i][j] === EMPTY_SQUARE) {
        foundEmptySquare = true;
      }
      potentialSquaresToFlip.push([i, j]);
      i += rowDiff;
      j += colDiff;
    }
  }); 
  return finalSquaresToFlip;
}

// Computer (black) turn moves
export const computerTurn = (grid) => {

  // Should be extracted to a separate function
  let squaresToChange = [];
  // Iterate through the board and try to find a valid move
  let i = MIN_INDEX;
  let validMoveFound = false;
  while (i <= MAX_INDEX && !validMoveFound) {
    let j = MIN_INDEX;
    while (j <= MAX_INDEX && !validMoveFound) {
      if (grid[i][j] === EMPTY_SQUARE) {
        const coordinatesAroundSquare = getCoordinatesAroundSquare(grid, i, j, 'w');  
        if (coordinatesAroundSquare.length > 0) {
          squaresToChange = findSquaresToChange(grid, i, j, coordinatesAroundSquare, 'b');
          if (squaresToChange.length > 0) {
            squaresToChange.push([i, j]);
            validMoveFound = true;
          }
        }
      }
      j++;
    }
    i++;
  }
  return squaresToChange;
}

// Find whether a player has valid moves
export const hasValidMoves = (grid, playerColor) => {
  const oponentColor = playerColor === 'w' ? 'b' : 'w';

  // Should be extracted to a separate function
  let squaresToChange = [];
  // Iterate through the board and try to find a valid move
  let i = MIN_INDEX;
  let validMoveFound = false;
  while (i <= MAX_INDEX && !validMoveFound) {
    let j = MIN_INDEX;
    while (j <= MAX_INDEX && !validMoveFound) {
      if (grid[i][j] === EMPTY_SQUARE) {
        const coordinatesAroundSquare = getCoordinatesAroundSquare(grid, i, j, oponentColor);  
        if (coordinatesAroundSquare.length > 0) {
          squaresToChange = findSquaresToChange(grid, i, j, coordinatesAroundSquare, playerColor);
          if (squaresToChange.length > 0) {
            squaresToChange.push([i, j]);
            validMoveFound = true;
          }
        }
      }
      j++;
    }
    i++;
  }
  return squaresToChange.length > 0;
}

// Player (white) turn moves
export const playersTurn = (grid, row, column, currentPlayerColor) => {
  if (grid[row][column] !== EMPTY_SQUARE) {
    return [];
  }
  const oponentColor = currentPlayerColor === 'w' ? 'b' : 'w';
  const coordinatesAroundSquare = getCoordinatesAroundSquare(grid, row, column, oponentColor);
  const squaresToChange = findSquaresToChange(grid, row, column, coordinatesAroundSquare, 'w');    
  return squaresToChange;
};
