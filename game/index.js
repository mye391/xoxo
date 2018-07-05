import {Map} from 'immutable'

const MOVE = 'MOVE'
const initialState = {
  turn: 'X',
  board: Map()
}

export const move = (player, position) => {
  return {
    type: MOVE,
    player,
    position
  }
}

const streak = (board, coord1, coord2, coord3) => {
  let player = board.getIn(coord1);

  if (player === board.getIn(coord2) && player === board.getIn(coord3)) {
    return player;
  }
}

const winner = (board) => {
  if (streak(board, [0,0], [0,1], [0,2])) {
    return `The winner is ${streak(board, [0,0], [0,1], [0,2])}!`;
  } else if (streak(board, [1,0], [1,1], [1,2])) {
    return `The winner is ${streak(board, [1,0], [1,1], [1,2])}!`;
  } else if (streak(board, [2,0], [2,1], [2,2])) {
    return `The winner is ${streak(board, [2,0], [2,1], [2,2])}!`;
  } else if (streak(board, [0,0], [1,0], [2,0])) {
    return `The winner is ${streak(board, [0,0], [1,0], [2,0])}!`;
  } else if (streak(board, [1,0], [1,1], [1,2])) {
    return `The winner is ${streak(board, [1,0], [1,1], [1,2])}!`;
  } else if (streak(board, [2,0], [1,2], [2,2])) {
    return `The winner is ${streak(board, [2,0], [1,2], [2,2])}!`;
  } else if (streak(board, [0,0], [1,1], [2,2])) {
    return `The winner is ${streak(board, [0,0], [1,1], [2,2])}!`;
  } else if (streak(board, [0,2], [1,1], [2,0])) {
    return `The winner is ${streak(board, [0,2], [1,1], [2,0])}!`;
  } else {
    for (let row=0; row<=2; row++) {
      for (let col=0; col<=2; col++) {
        if (!board.hasIn([row, col])) return null;
      }
    }
    return 'DRAW! EVERYONE WINS!';
  }
}

// const reducer = (state = initialState, action) => {
//   // const newState = Object.assign({}, state);
//   const newState = {...state}
//   switch (action.type) {
//     case MOVE:
//       newState.board = newState.board.setIn(action.position, action.player);
//       newState.turn = newState.turn === 'X' ? 'O' : 'X';
//       console.log(winner(newState.board));
//       return newState;
//     default:
//       return state
//   }
// }

const turnReducer = (turn = 'X', action) => {
  if (action.type === MOVE) {
    return turn === 'X' ? 'O' : 'X'
  }
  return turn
}

const boardReducer = (board = Map(), action) => {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.player)
  }
  return board
}

const reducer = (state = initialState, action) => {
  const nextBoard = boardReducer(state.board, action)
  const winnerState = winner(nextBoard)
  return {
    board: nextBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState
  }
}

export default reducer
