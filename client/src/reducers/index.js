import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

//Takes all the reducers and combines them
export default combineReducers({
  alert,
  auth,
});
