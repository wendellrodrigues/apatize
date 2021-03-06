import {
  GENERATE_MEAL_PLAN,
  DELETE_MEAL_PLAN,
  MEAL_PLAN_ERROR,
  SET_PLAN_LOADING,
  SET_PLAN,
  ADJUST_CUR_MEALS,
  SAVE_CUR_PLAN,
} from "../actions/types";

const initialState = {
  loading: false,
  plan: {
    sunday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    monday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    tuesday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    wednesday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    thursday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    friday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
    saturday: {
      breakfasts: null,
      lunches: null,
      dinners: null,
    },
  },
  currentMeals: {
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
  },
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
    case SET_PLAN:
      return {
        ...state,
        plan: payload.week,
        currentMeals: payload.current,
      };
    case ADJUST_CUR_MEALS:
      return {
        ...state,
        currentMeals: payload.currentMeals,
      };
    case SAVE_CUR_PLAN:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
