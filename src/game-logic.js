// export const kuku = (symbol, ...rows) => countInRightSlant(symbol, ...rows) === 2;
const EMPTY_SQUARE = '';
const MIN_INDEX = 0;
const MAX_INDEX = 7;


// Gets the coordinates of all the squares around the desired square
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

const validateCoordinatesInBoard = (row, column) => {
  return (row <= MAX_INDEX && row >= MIN_INDEX && column <= MAX_INDEX && column >= MIN_INDEX);
}

export const computerTurn = (grid) => {
  console.log('computeer now');
}

export const playersTurn = (grid, row, column, currentPlayerColor) => {
  if (grid[row][column] !== EMPTY_SQUARE) {
    return [];
  }

  const oponentColor = currentPlayerColor === 'w' ? 'b' : 'w';
  const coordinatesAroundSquare = getCoordinatesAroundSquare(grid, row, column, oponentColor);

  //console.log(coordinatesAroundSquare);
  let finalSquaresToFlip = [];

  coordinatesAroundSquare.forEach((coordinates, index) => {
  
    const nextSquareRow = coordinates[0];
    const nextSquareCol = coordinates[1];

    const rowDiff = nextSquareRow - row;
    const colDiff = nextSquareCol - column;

//console.log(rowDiff);
//console.log(colDiff);

    // Looking for the next square with the current player's color
    const potentialSquaresToFlip = [
     [nextSquareRow, nextSquareCol]
    ]
    let i = nextSquareRow + rowDiff;
    let j = nextSquareCol + colDiff;
    //let foundSameColorSquare = false;
    let foundEmptySquare = false;
    while (i <= MAX_INDEX && i >= MIN_INDEX && j <= MAX_INDEX && j >= MIN_INDEX && !foundEmptySquare) {
      if (grid[i][j] === currentPlayerColor) {
        //flipColors(potentialSquaresToFlip);
        console.log(potentialSquaresToFlip);
        finalSquaresToFlip = [...potentialSquaresToFlip];
        //foundSameColorSquare = true;
        //return true;
        //return potentialSquaresToFlip;
        break;
      } else if (grid[i][j] === EMPTY_SQUARE) {
        foundEmptySquare = true;
      }

      potentialSquaresToFlip.push([i, j]);
      i += rowDiff;
      j += colDiff;
    }
    //console.log(potentialSquaresToFlip);

  });
console.log('kan');
console.log(finalSquaresToFlip);
  // Return empty array if no sqyres to flip == the valid was not valid
  return finalSquaresToFlip;
  //return true;

};
