import { SHOW_SIDE_MENU, HIDE_SIDE_MENU } from "../actions/types";

const initialState = {
  open: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_SIDE_MENU:
      return {
        ...state,
        open: true,
      };
    case HIDE_SIDE_MENU:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}
