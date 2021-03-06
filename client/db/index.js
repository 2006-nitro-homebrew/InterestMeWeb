import firebase from 'firebase'
import '@firebase/firestore'
// import {firebaseConfig} from '../secrets'
require('../../secrets')
let firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN ,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID ,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID ,
  measurementId: process.env.MEASUREMENTID,
}

// initializes the firestore database
firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

export default db
