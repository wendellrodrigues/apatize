import axios from "axios";
import {
  GENERATE_MEAL_PLAN,
  DELETE_MEAL_PLAN,
  MEAL_PLAN_ERROR,
  GET_PROFILE,
  SET_PLAN_LOADING,
  SET_PLAN,
  ADJUST_CUR_MEALS,
  SAVE_CUR_PLAN,
} from "./types";
import { setAlert } from "./alert";
import { getCurrentProfile } from "./profile";

const baseUrl = process.env.REACT_APP_BASE_URL;

//Update Meal Plan (week)
export const generateMealPlan = (formData) => async (dispatch) => {
  //Start loading
  dispatch({
    type: SET_PLAN_LOADING,
  });

  //Execute meal plan generation
  try {
    //Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Make axios request
    const res = await axios.post(
      `${baseUrl}/food/generateMealPlan`,
      formData,
      config
    );

    //Get current profile when done (dispatch)
    await dispatch(getCurrentProfile());

    //Turn loading off when getCurrentProfile finishes
    dispatch({
      type: GENERATE_MEAL_PLAN,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: MEAL_PLAN_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

//Delete Meal Plan (week)
export const deleteMealPlan = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`${baseUrl}/food/deleteMealPlan`, config);
    dispatch({
      type: DELETE_MEAL_PLAN,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: MEAL_PLAN_ERROR,
      payload: { msg: err, status: err },
    });
  }
};

//Sets the actual meal plan to days
export const setPlan = (plan) => async (dispatch) => {
  dispatch({
    type: SET_PLAN,
    payload: plan,
  });
};

export const adjustCurrentMeals =
  (currentMeals, newMeal, day, type) => async (dispatch) => {
    currentMeals[day][type] = newMeal;
    dispatch({
      type: ADJUST_CUR_MEALS,
      payload: { currentMeals },
    });
  };

export const saveCurrentPlan = (plan) => async (dispatch) => {
  //Start loading
  dispatch({
    type: SET_PLAN_LOADING,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    ////Make call to backend to save current plan
    const res = await axios.post(
      `${baseUrl}/food/saveCurrentPlan`,
      plan,
      config
    );
  } catch (err) {
    dispatch({
      type: MEAL_PLAN_ERROR,
      payload: { msg: err, status: err },
    });
  }

  //Finish loading
  dispatch({
    type: SAVE_CUR_PLAN,
  });
};
