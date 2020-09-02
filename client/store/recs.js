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
