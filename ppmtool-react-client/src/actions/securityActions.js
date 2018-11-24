import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dipatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dipatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dipatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = loginRequest => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", loginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    //set the token in the header of HTTP calls
    setJWTToken(token);
    const decoded = jwt_decode(token);

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
