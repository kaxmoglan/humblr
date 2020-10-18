import {
  SET_MURMURS,
  SET_MURMUR,
  LIKE_MURMUR,
  UNLIKE_MURMUR,
  LOADING_DATA,
  DELETE_MURMUR,
  POST_MURMUR,
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
      let index = state.murmurs.findIndex(
        (murmur) => murmur.murmurId === action.payload.murmurId
      );
      state.murmurs[index] = action.payload;
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
    default:
      return state;
  }
};
