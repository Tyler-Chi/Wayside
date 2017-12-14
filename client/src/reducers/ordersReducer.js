import { FETCH_ORDERS } from "../actions/types";

export default function(oldState = [], action) {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case FETCH_ORDERS:
      return action.payload;
    default:
      return oldState;
  }
}
