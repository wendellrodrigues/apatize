import { CHANGE_DAY } from "./types";

export const changeDay = (day) => (dispatch) => {
  dispatch({
    type: CHANGE_DAY,
    payload: day,
  });
};
