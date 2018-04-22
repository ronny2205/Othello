// export function playerMove(isOver, isPlayerTurn) {
//   return {
//     type: 1,
//     payload: { isOver, isPlayerTurn }
//   }
// }






export const addTyle = (tyle, row, column) => ({
  type: 'ADD_TYLE',
  tyle,
  row,
  column
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});