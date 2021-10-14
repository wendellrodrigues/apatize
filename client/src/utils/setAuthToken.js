import axios from "axios";

//Takes a token and adds or deletes from global headers
//Tokens will be sent with every request
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
