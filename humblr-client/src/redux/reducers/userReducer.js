import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_MURMUR,
  UNLIKE_MURMUR,
  MARK_NOTIFICATIONS_READ,
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
            murmurId: action.payload.murmurId,
          },
        ],
      };
    case UNLIKE_MURMUR:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.murmurId !== action.payload.murmurId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((note) => (note.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
