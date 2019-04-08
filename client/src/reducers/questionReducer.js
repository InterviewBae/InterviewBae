import { GET_QUESTION } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTION:
      return action.payload;
    default:
      return state;
  }
}
