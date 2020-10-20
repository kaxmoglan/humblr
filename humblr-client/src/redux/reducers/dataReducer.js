import {
  SET_MURMURS,
  SET_MURMUR,
  LIKE_MURMUR,
  UNLIKE_MURMUR,
  LOADING_DATA,
  DELETE_MURMUR,
  POST_MURMUR,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  murmurs: [],
  murmur: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_MURMURS:
      return {
        ...state,
        murmurs: action.payload,
        loading: false,
      };
    case SET_MURMUR:
      return {
        ...state,
        murmur: action.payload,
      };
    case LIKE_MURMUR:
    case UNLIKE_MURMUR:
      let comments = state.murmur.comments;
      let index = state.murmurs.findIndex(
        (murmur) => murmur.murmurId === action.payload.murmurId
      );
      state.murmurs[index] = action.payload;
      if (state.murmur.murmurId === action.payload.murmurId) {
        state.murmur = action.payload;
        state.murmur.comments = comments;
      }
      return {
        ...state,
      };
    case DELETE_MURMUR:
      return {
        ...state,
        murmurs: state.murmurs.filter(
          (murmur) => murmur.murmurId !== action.payload
        ),
      };
    case POST_MURMUR:
      return {
        ...state,
        murmurs: [action.payload, ...state.murmurs],
      };
    case SUBMIT_COMMENT:
      let i = state.murmurs.findIndex(
        (murmur) => murmur.murmurId === action.payload.murmurId
      );
      state.murmurs[i].commentCount = state.murmurs[i].commentCount + 1;
      return {
        ...state,
        murmur: {
          ...state.murmur,
          comments: [action.payload, ...state.murmur.comments],
          commentCount: state.murmur.commentCount + 1,
        },
      };
    default:
      return state;
  }
};
