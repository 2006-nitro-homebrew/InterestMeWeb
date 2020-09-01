import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import articles from './articles'
import article from './singleArticle'
import addArticle from './addArticle'
import {loadState, saveState} from './storage'
import recs from './recs'

const persistedState = loadState()

const reducer = combineReducers({user, articles, article, addArticle,recs}) //make sure to put individual reducers here

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  saveState({
    user: store.getState().user
  })
})

export default store
// export * from "./user";
