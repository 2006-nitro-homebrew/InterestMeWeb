import db from '../db/index'

//Action types
const GET_ARTICLE = 'GET_ARTICLE'

//Action creators
export const getArticle = article => {
  return {
    type: GET_ARTICLE,
    article
  }
}

//Thunk creators
export const fetchArticle = (uid, id) => {
  return dispatch => {
    try {
      db
        .collection(`users/${uid}/savedOffline`) //replace testuser with actual user id
        .doc(id)
        .get()
        .then(doc => {
          if (!doc.exists) return
          console.log('Document data: ', doc.data())
          let data = doc.data()
          dispatch(getArticle(data))
        })
    } catch (err) {
      console.error(err)
    }
  }
}

//Reducer
const initialState = []
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return action.article
    default:
      return state
  }
}
