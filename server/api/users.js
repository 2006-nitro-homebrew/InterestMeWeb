const router = require('express').Router()
const {scrapeAll} = require('../scraper')
const db = require('../db/index')
const firebase = require('firebase')

module.exports = router

router.get('/pull', async (req, res, next) => {
  try {
    const ARTICLE_URL =
      'http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html'
    scrapeAll(ARTICLE_URL).then((result) => {
    firebase.firestore()
    .collection('users')
    .doc('h6t7Md19adggNhvjHUc22LW6RGF2')
    .collection('savedOffline')
    .add({html:result})
  
  })
    
  } catch (error) {
    console.error(error)
  }
})
