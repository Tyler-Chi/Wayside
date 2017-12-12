import axios from "axios";
import { FETCH_USER } from "./types";

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
  console.log("axios values", values);
  axios
    .post("/api/trips", values)
    .then(values => dispatch({ type: FETCH_USER, payload: values }));

  //where do we want to push them after this?
};
