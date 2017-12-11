import { combineReducers } from "redux";
import authReducer from "./authReducer";

//this is basically our root reducer
export default combineReducers({
  auth: authReducer
});

