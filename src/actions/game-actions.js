
export const changeTyle = (tyle, squaresToChange) => ({
  type: 'CHANGE_TYLE',
  tyle,
  squaresToChange
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});