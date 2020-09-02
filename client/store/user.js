// import axios from 'axios'
import history from '../history'
import firebase from 'firebase';
import db from "../db/index";

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CLEAR_ERROR = 'CLEAR_ERROR'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const clearError = () => ({type: CLEAR_ERROR})

/**
 * THUNK CREATORS
 */


export const auth = (email, password, method) => async (dispatch) => {
    let uid
    try {
        if (method == 'signup') {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch( error => {
                dispatch(getUser({ error: error.message }))
            })
            .then((bool) => {
                if(!bool) return
                uid = firebase.auth().currentUser.uid
                firebase.firestore().collection("users").doc(uid).set({
                    email,uid
                })
                return true
            })
            .then((bool) =>{
                if(!bool) return
                try {
                    db.collection("users").doc(uid)
                        .get()
                        .then((doc) => {
                            if (!doc.exists) return;
                            let data = doc.data()
                            dispatch(getUser(data))
                            history.push('/')
                        });
                } catch (dispatchOrHistoryErr) {
                    console.error(dispatchOrHistoryErr)
                }
            })
        }
        else {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                uid = firebase.auth().currentUser.uid
            })
            .catch( error => {
                dispatch(getUser({ error: error.message }))
            })
            .then(() =>{
                try {
                    if(!uid) return;
                    db.collection("users").doc(uid)
                        .get()
                        .catch( error => console.log(error))
                        .then((doc) => {
                            if (!doc.exists) return;
                            let data = doc.data()
                            dispatch(getUser(data))
                            history.push('/')
                        })

                } catch (dispatchOrHistoryErr) {
                    console.error(dispatchOrHistoryErr)
                }
            })
        }

    } catch (authError) {
        console.log(authError)
        return dispatch(getUser({ error: authError.message }))
    }
}

export const logout = () => (dispatch) => {
    try {
        firebase.auth().signOut()
        dispatch(removeUser())
        history.push('/login')
    } catch (err) {
        console.error(err)
    }
}

export const clearErr = () => (dispatch) => {
  dispatch(clearError())
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user
        case REMOVE_USER:
            return defaultUser
        case CLEAR_ERROR:
            return {...state, error: ''}
        default:
            return state
    }
}
