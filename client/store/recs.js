import axios from 'axios'
//Action types
const GET_RECS = 'GET_RECS'

//Action creators
export const getRecs = recs => {
    return {
        type: GET_RECS,
        recs
    }
}

//Thunk creators
//fetches recommended articles based on the keywords generated from the machine learning algorithm
export const fetchRecs = (keywordOne, keywordTwo, keywordThree) => {
    return async dispatch => {
        try {
            let {data} = await axios.post('/api/users/recs', {
                keywordOne, keywordTwo, keywordThree
            })
            dispatch(getRecs(data))
        } catch (err) {
            console.error(err)
        }
    }
}

//default recommendations (top news) for if user has no saved articles
export const fetchDefaultRecs = () => {
    return async dispatch => {
        try {
            let {data} = await axios.get('/api/users/defaultrecs')
            dispatch(getRecs(data))
        } catch (err) {
            console.error(err)
        }
    }
}

//Reducer
const initialState = []
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECS:
            return action.recs
        default:
            return state
    }
}
