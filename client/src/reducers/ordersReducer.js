import { FETCH_ORDERS, FETCH_ORDER } from "../actions/types";

export default function(oldState = [], action) {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case FETCH_ORDER:
      newState[action.payload._id] = action.payload;
      return newState;

    case FETCH_ORDERS:
      return action.payload;
    default:
      return oldState;
  }
}
