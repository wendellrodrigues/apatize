import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  GENERATE_MEAL_PLAN,
  DELETE_MEAL_PLAN,
} from "./types";
import { setAlert } from "./alert";

const baseUrl = process.env.REACT_APP_BASE_URL;

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/profile/me`);
    //If success, dispatch the payload
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or update Profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${baseUrl}/profile`, formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      //Alert
      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));

      //Creating new profile redirect to dashboard
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg)));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
