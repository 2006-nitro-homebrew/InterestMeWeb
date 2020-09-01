import db from '../db/index'
import axios from 'axios'

//Action types
const ADD_ARTICLE = 'ADD_ARTICLE'

//Action creators
export const addArticle = (newArticle) => {
  return {
    type: ADD_ARTICLE,
    newArticle,
  }
}

//Thunk creators
//For when user saves an article and adds into the database
export const fetchAddArticle = (userId, url) => {
  // sends axios post request with userID and the URL to our Express Route
  return async (dispatch) => {
    let {data} = await axios.post('/api/users/pull', {
        userId,
        url
    })
    dispatch(addArticle(data))
  }
}

//Reducer
const initialState = []
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ARTICLE:
      return action.newArticle
    default:
      return state
  }
}
