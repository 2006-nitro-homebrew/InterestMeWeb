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
  //add articleurl as parameter later
  return async (dispatch) => {
    console.log('fetchaddarticle')
    try {
      let {data} = await axios
        .post('/api/users/pull', {
          userId,
          url,
        })
        .then(dispatch(addArticle('SUCCESS')))
      //if post was successful, send success status
    } catch (error) {
      //if post failed, send failure status
      console.log('ERROR')
      dispatch(addArticle('ERROR'))
    }
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
