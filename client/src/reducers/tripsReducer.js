import { FETCH_TRIPS, FETCH_TRIP } from "../actions/types";

export default function(oldState = {}, action) {
  Object.freeze(oldState);

  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case FETCH_TRIP:
      console.log("i am in the tripReducer");
      console.log(action.payload);
      // Object.assign(newState, {action.payload._id: action.payload});

      newState[action.payload._id] = action.payload;

    case FETCH_TRIPS:
      return action.payload;
    default:
      return oldState;
  }
}
