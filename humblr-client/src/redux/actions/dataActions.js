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
  SUBMIT_COMMENT,
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
      dispatch(clearErrors());
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

// SUBMIT COMMENT
export const submitComment = (murmurId, commentData) => (dispatch) => {
  axios
    .post(`/murmur/${murmurId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
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

// GET USER DATA FOR USER PAGE
export const getUserData = (username) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({ type: SET_MURMURS, payload: res.data.murmurs });
    })
    .catch(() => {
      dispatch({ type: SET_MURMURS, payload: null });
    });
};

// CLEAR ERRORS FUNCTION
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
