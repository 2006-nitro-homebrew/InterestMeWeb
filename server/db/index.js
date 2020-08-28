const firebase = require('firebase')
require("firebase/firestore");
// import {firebaseConfig} from '../secrets'
require('../../secrets')
let firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
}

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()

//Saves firestore database into indexedDB on chrome for offline article viewing
db.enablePersistence().catch(err => {
    if (err.code === 'failed-precondition') {
        console.log('persistence failed')
    } else if (err.code === 'unimplemented') {
        console.log('persistence is not available')
    }
});

module.exports = {db}
