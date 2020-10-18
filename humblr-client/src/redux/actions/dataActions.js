import {
  SET_MURMUR,
  SET_MURMURS,
  LOADING_DATA,
  LIKE_MURMUR,
  UNLIKE_MURMUR,
  DELETE_MURMUR,
  LOADING_UI,
  STOP_LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_MURMUR,
} from "../types";
import axios from "axios";

// GET ALL MURMURS
export const getMurmurs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/murmurs")
    .then((res) => {
      dispatch({ type: SET_MURMURS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_MURMURS, payload: [] });
    });
};

// GET MURMUR
export const getMurmur = (murmurId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/murmur/${murmurId}`)
    .then((res) => {
      dispatch({ type: SET_MURMUR, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// POST MURMUR
export const postMurmur = (newMurmur) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/murmur", newMurmur)
    .then((res) => {
      dispatch({ type: POST_MURMUR, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

// LIKE MURMUR
export const likeMurmur = (murmurId) => (dispatch) => {
  axios
    .get(`/murmur/${murmurId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_MURMUR, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// UNLIKE MURMUR
export const unlikeMurmur = (murmurId) => (dispatch) => {
  axios
    .get(`/murmur/${murmurId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_MURMUR, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// DELETE MURMUR
export const deleteMurmur = (murmurId) => (dispatch) => {
  axios
    .delete(`/murmur/${murmurId}`)
    .then(() => {
      dispatch({ type: DELETE_MURMUR, payload: murmurId });
    })
    .catch((err) => console.log(err));
};

// CLEAR ERRORS
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
