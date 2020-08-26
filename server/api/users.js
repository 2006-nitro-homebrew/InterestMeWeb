const router = require('express').Router()
const {scrapeAll} = require('../scraper')
const db = require('../db/index')
const firebase = require('firebase')

module.exports = router

router.post('/pull', async (req, res, next) => {
  try {
    console.log('is this req.body?',req.body)
    // const ARTICLE_URL =
    //   'http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html'
    scrapeAll(req.body.url).then((result) => {
    firebase.firestore()
    .collection('users')
    .doc(req.body.userId)
    .collection('savedOffline')
    .add({html:result})

  })

  } catch (error) {
    console.error(error)
  }
})


