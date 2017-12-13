import { FETCH_TRIPS } from "../actions/types";

export default function(oldState = null, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case FETCH_TRIPS:
      return action.payload;
    default:
      return oldState;
  }
}
