import db from '../db/index'

//Action types
const GET_ARTICLES = 'GET_ARTICLES'

//Action creators
export const getArticles = articles => {
  return {
    type: GET_ARTICLES,
    articles
  }
}

//Thunk creators
// display saved articles according to userId logged in
// listen to the document with onSnapshot. Each time the contents of document change, the call updates the document snapshot.
export const fetchArticles = uid => {
  return async dispatch => {
    try {
      await db
        .collection(`users/${uid}/savedOffline`)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          dispatch(getArticles(data))
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
    case GET_ARTICLES:
      return action.articles
    default:
      return state
  }
}
