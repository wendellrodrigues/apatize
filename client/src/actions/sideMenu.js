import { HIDE_SIDE_MENU, SHOW_SIDE_MENU } from "./types";

export const showMenu = () => async (dispatch) => {
  dispatch({
    type: SHOW_SIDE_MENU,
  });
};

export const hideMenu = () => async (dispatch) => {
  dispatch({
    type: HIDE_SIDE_MENU,
  });
};
