// export function playerMove(isOver, isPlayerTurn) {
//   return {
//     type: 1,
//     payload: { isOver, isPlayerTurn }
//   }
// }






export const addTyle = (tyle, squaresToChange) => ({
  type: 'ADD_TYLE',
  tyle,
  squaresToChange
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});