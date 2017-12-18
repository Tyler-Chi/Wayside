import { FETCH_TRIPS, FETCH_TRIP } from "../actions/types";

export default function(oldState = {}, action) {
  Object.freeze(oldState);

  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case FETCH_TRIP:
      newState[action.payload._id] = action.payload;
      return newState;

    case FETCH_TRIPS:
      return action.payload;
    default:
      return oldState;
  }
}
