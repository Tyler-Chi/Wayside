import { FETCH_TRIPS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TRIPS:
      return action.payload;
    default:
      return false;
  }
}
