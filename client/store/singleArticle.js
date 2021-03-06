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
//fetch one single article based on userId to open for view
export const fetchArticle = (uid, id) => {
  return dispatch => {
    try {
      db
        .collection(`users/${uid}/savedOffline`)
        .doc(id)
        .get()
        .then(doc => {
          if (!doc.exists) return
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
