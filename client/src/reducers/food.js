import {
  GENERATE_MEAL_PLAN,
  DELETE_MEAL_PLAN,
  MEAL_PLAN_ERROR,
  SET_PLAN_LOADING,
} from "../actions/types";

const initialState = {
  loading: false,
  error: {},
};

export default function food(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PLAN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_MEAL_PLAN:
      return {
        ...state,
        loading: false,
      };
    case MEAL_PLAN_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_MEAL_PLAN:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
