import axios from "axios";
import { setAlert } from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

const baseUrl = process.env.REACT_APP_BASE_URL;

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

    //Make request
    try {
      const res = await axios.post(
        `${baseUrl}/users`,
        // "/server/api/users",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //Token
      });
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
