import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

import { setAuthToken } from "../utils/setAuthToken";

const baseUrl = process.env.REACT_APP_BASE_URL;

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${baseUrl}/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

//Register User
export const register =
  ({ name, email, password, code }) =>
  async (dispatch) => {
    //Set Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Set body
    const body = JSON.stringify({ name, email, password, code });

    console.log(`Body: ${body}`);
    console.log(`BASE URL: ${baseUrl}`);

    //Make request
    try {
      const res = await axios.post(`${baseUrl}/users`, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //Token
      });
      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg)));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Register User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    //Set Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Set body
    const body = JSON.stringify({ email, password });

    //Make request
    try {
      const res = await axios.post(`${baseUrl}/auth`, body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, //Token
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg)));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
