import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        validToken: action.payload ? (state.validToken = true) : (state.validToken = false)
      };
    default:
      return state;
  }
}
