import axios from "axios";
import { FETCH_USER, FETCH_TRIPS, FETCH_TRIP, FETCH_ORDER } from "./types";

//making api call to grab the current user
//need to make sure it goes to localhost:5000, not 3000

//res is the response from the API

//redux thunk will see that it is being given a function, and will automatically give it the dispatch argument.

//we then make our get request
//once the response comes back, we then dispatch the action with the payload
//the payload being what we got from the get request to the API.

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

//i THINK that values is the body of the request

export const submitTrip = (values, history) => dispatch => {
  axios
    .post("/api/trips", values)
    .then(values => dispatch({ type: FETCH_USER, payload: values.data }));

  //where do we want to push them after this?
};

export const submitOrder = (values, history) => dispatch => {
  axios
    .post("/api/orders", values)
    .then(values => dispatch({ type: FETCH_USER, payload: values.data }));
};

export const fetchAllTrips = () => dispatch => {
  axios
    .get("/api/trips/all")
    .then(trips => dispatch({ type: FETCH_TRIPS, payload: trips.data }));
  //eventually have .then, use actions to
  //post it into the state
};

export const fetchAllUpcoming = () => dispatch => {
  axios
    .get("/api/trips/allUpcoming")
    .then(trips => dispatch({ type: FETCH_TRIPS, payload: trips.data }));
};

export const fetchCompletedTrips = async () => dispatch => {
  axios
    .get("/api/trips/completed")
    .then(trips => dispatch({ type: FETCH_TRIPS, payload: trips.data }));
};

// export function fetchCompletedTrips(trips = []) {
//   return function action(dispatch) {
//     dispatch({ type: FETCH_TRIPS, payload: trips });
//
//     const request = axios({
//       method: "GET",
//       url: "/api/trips/completed",
//       headers: []
//     });
//
//     return request.then(response => dispatch(fetchCompletedTrips(response)));
//   };
// }

export const fetchUpcomingTrips = () => dispatch => {
  axios
    .get("/api/trips/upcoming")
    .then(trips => dispatch({ type: FETCH_TRIPS, payload: trips.data }));
};

export const fetchTrip = tripId => dispatch => {
  axios
    .get(`/api/trips/${tripId}`)
    .then(trip => dispatch({ type: FETCH_TRIP, payload: trip.data }));
};
