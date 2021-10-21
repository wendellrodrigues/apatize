import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import sideMenu from "./sideMenu";

//Takes all the reducers and combines them
export default combineReducers({
  alert,
  auth,
  profile,
  sideMenu,
});
