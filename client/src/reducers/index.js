import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  currentQuestion: questionReducer
});
