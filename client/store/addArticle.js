import db from '../db/index'
import axios from 'axios'

//Action types
const ADD_ARTICLE = 'ADD_ARTICLE'
const CLEAR_ADD = 'CLEAR_ADD'

//Action creators
export const addArticle = (newArticle) => {
  return {
    type: ADD_ARTICLE,
    newArticle,
  }
}

const clear = () => ({type: CLEAR_ADD})

//Thunk creators
//For when user saves an article and adds into the database
export const fetchAddArticle = (userId, url) => {
  //add articleurl as parameter later
  return (dispatch) => {
      let {data} = axios
        .post('/api/users/pull', {
          userId,
          url,
        })
        .catch(() => {
          dispatch(addArticle('ERROR'))
          return false
        })
        .then((bool) => {
          if(bool) dispatch(addArticle('SUCCESS'))
        })
  }
}

export const clearAdd = () => (dispatch) => {
  dispatch(clear())
}

//Reducer
const initialState = []
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return action.newArticle
    case CLEAR_ADD:
      return initialState
    default:
      return state
  }
}
