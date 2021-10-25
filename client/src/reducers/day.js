import { CHANGE_DAY } from "../actions/types";

//Set day initially
const setToday = () => {
  const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  //Standardize Time to PST
  var d = new Date();
  var date = new Date(d.toUTCString());
  date.setHours(date.getHours() - 7);

  const day = date.getDay();
  return days[day];
};

const initialState = {
  day: setToday(),
  //day: null,
  loading: true,
};

export default function day(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_DAY:
      return {
        ...state,
        day: payload,
        loading: false,
      };
    default:
      return state;
  }
}
