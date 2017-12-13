import { combineReducers } from "redux";
import authReducer from "./authReducer";
import entitiesReducer from "./entitiesReducer";

//this is basically our root reducer
export default combineReducers({
  auth: authReducer,
  entities: entitiesReducer
});
