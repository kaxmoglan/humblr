import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_MURMUR,
  UNLIKE_MURMUR
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_MURMUR:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            murmurId: action.payload.murmurId
          }
        ]
      }
    case UNLIKE_MURMUR:
      return {
        ...state,
        likes: state.likes.filter(like => like.murmurId !== action.payload.murmurId)
      }
    default:
      return state;
  }
}
