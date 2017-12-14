import { combineReducers } from "redux";
import tripsReducer from "./tripsReducer";
import currentlyViewedTripReducer from "./currentlyViewedTripReducer";
import ordersReducer from "./ordersReducer";

export default combineReducers({
  trips: tripsReducer,
  currentlyViewedTrip: currentlyViewedTripReducer,
  orders: ordersReducer
});
