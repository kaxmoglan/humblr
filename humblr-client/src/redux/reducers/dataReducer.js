import { SET_MURMURS, LIKE_MURMUR, UNLIKE_MURMUR, LOADING_DATA } from '../types';

const initialState = {
  murmurs: [],
  murmur: {},
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_MURMURS:
      return {
        ...state,
        murmurs: action.payload,
        loading: false
      }
    case LIKE_MURMUR:
    case UNLIKE_MURMUR:
      let index = state.murmurs.findIndex((murmur) => murmur.murmurId === action.payload.murmurId);
      state.murmurs[index] = action.payload;
      return {
        ...state,
      }
    default:
      return state;
  }
}