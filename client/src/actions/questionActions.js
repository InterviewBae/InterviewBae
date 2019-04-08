import axios from "axios";
import { GET_QUESTION } from "./types";

export const getQuestion = () => dispatch => {
    axios
    .get("/question")
    .then(res => dispatch(setQuestion(res)));
}

export const setQuestion = question => {
    return {
      type: GET_QUESTION,
      payload: question
    };
};