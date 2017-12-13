import { combineReducers } from "redux";
import tripsReducer from "./tripsReducer";
import currentlyViewedTripReducer from "./currentlyViewedTripReducer";

export default combineReducers({
  trips: tripsReducer,
  currentlyViewedTrip: currentlyViewedTripReducer
});
