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
export const fetchAddArticle = (userId) => {
  //add articleurl as parameter later
  return async (dispatch) => {
    console.log('fetchaddarticle')
    let data = await axios.get('./api/users/pull')
    // console.log(data)
    console.log(data)
    dispatch(data)
    // scrapeAll("http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html").then((result) => console.log(result));

    // try {
    //   db.collection(`users/${userId}/savedOffline`) //replace testuser with actual user id
    //     .add({
    //       content: scrapeAll(
    //         "http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html"
    //       ).content,
    //       style: scrapeAll(
    //         "http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html"
    //       ).style,
    //     })
    //     .then(function (docRef) {
    //       console.log("Document written with ID: ", docRef.id);
    //       dispatch(addArticle(docRef.id));
    //     });
    // } catch (err) {
    //   console.error(err);
    // }
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
