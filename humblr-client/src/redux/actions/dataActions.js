import { SET_MURMURS, LOADING_DATA, LIKE_MURMUR, UNLIKE_MURMUR, DELETE_MURMUR } from '../types';
import axios from 'axios';

// GET ALL MURMURS
export const getMurmurs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios.get('/murmurs')
    .then(res => {
      dispatch({ type: SET_MURMURS, payload: res.data})
    })
    .catch(err => {
      dispatch({ type: SET_MURMURS, payload: []})
    })
}

// LIKE MURMUR
export const likeMurmur = (murmurId) => (dispatch) => {
  axios.get(`/murmur/${murmurId}/like`)
    .then(res => {
      dispatch({ type: LIKE_MURMUR, payload: res.data })
    })
    .catch(err => console.log(err))
}

// UNLIKE MURMUR
export const unlikeMurmur = (murmurId) => (dispatch) => {
  axios.get(`/murmur/${murmurId}/unlike`)
    .then(res => {
      dispatch({ type: UNLIKE_MURMUR, payload: res.data })
    })
    .catch(err => console.log(err))
}

// DELETE MURMUR
export const deleteMurmur = (murmurId) => (dispatch) => {
  axios.delete(`/murmur/${murmurId}`)
    .then(() => {
      dispatch({ type: DELETE_MURMUR, payload: murmurId })
    })
    .catch(err => console.log(err))
}