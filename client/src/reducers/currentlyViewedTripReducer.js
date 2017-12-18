import { FETCH_TRIP } from "../actions/types";

export default function(oldState = null, action) {
  Object.freeze(oldState);
  switch (action.type) {
    case FETCH_TRIP:
      return action.payload;
    default:
      return true;
  }
}
