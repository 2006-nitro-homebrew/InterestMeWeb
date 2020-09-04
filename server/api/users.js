const router = require('express').Router()
const {scrapeAll} = require('../scraper')
const db = require('../db/index')
const firebase = require('firebase')
const stoplist = require('../stoplist')
const wordhash = require('../wordhash')
const NewsAPI = require('newsapi')
require('../../secrets')

module.exports = router

//route to scrape article content, styles, and keywords
router.post('/pull', async (req, res, next) => {
  try {
    scrapeAll(req.body.url).then((result) => {
      let savedResult = {content: result.content.article, styles: result.styles}
      //make hashmap to keep track of all words
      let m = new Map()
      //inserting words based on weight of words
      //tagged words (h1,-h6) would get weighed higher
      //words within the body tag are scored 0.3 (if more than 150 words in the body) or 0.6 (if less than 150 words in the body)
      const customweight = result.content.htmlwords.length > 150 ? 0.3 : 0.6
      wordhash(result.content.htmlwords, customweight, m)
      wordhash(result.content.h1words, 6, m)
      wordhash(result.content.h2words, 5, m)
      wordhash(result.content.h3words, 4, m)
      wordhash(result.content.h4words, 2, m)
      wordhash(result.content.h5words, 2, m)
      wordhash(result.content.h6words, 2, m)
      wordhash(
        result.content.title
          .replace(/[^\w\s]|_/g, '')
          .replace(/\s+/g, ' ')
          .split(' '),
        5,
        m
      )
      wordhash(result.content.hostname, 5, m)
      wordhash(result.content.pathname, 4, m)
      //loop through the stoplist words and removes them from the hashmap (unnecessary words)
      for (let i = 0; i < stoplist.length; i++) {
        m.delete(stoplist[i])
      }
      m.delete('')
      //sort by which words have most weight (greatest to least)
      let arr = [...m.entries()]
      let sortedarr = arr.sort(function (a, b) {
        return b[1] - a[1]
      })
      let keywords = []
      //take first 3 sorted words (3 highest scored) where word length is greater than 2 and less than 15
      if (sortedarr.length >= 3) {
        while (keywords.length < 3) {
          let add = sortedarr.shift()[0]
          if (add.length > 2 && add.length < 15) {
            keywords.push(add)
          }
        }
      }
      //generate random integer to pick random integer from 0-150 to pick a random article for the recommendation page
      let random = Math.floor(Math.random() * Math.floor(150))
      //add article (scraped article) to the firestore
        firebase
        .firestore()
        .collection('users')
        .doc(req.body.userId)
        .collection('savedOffline')
        .add({
          html: savedResult,
          title: result.content.title,
          url: result.content.url,
          originalurl: result.content.originalurl,
          keywords,
          random,
        })
        .catch(() => {
          res.send(404)
        })
        .then((bool) => {
          if(bool) res.send(200)
        })

    })
    // Deprecated fields that can be saved to Firebase
    // htmlwords: result.content.htmlwords,
    // h1words: result.content.h1words, h2words: result.content.h2words, h3words: result.content.h3words,
    // h4words: result.content.h4words, h5words: result.content.h5words, h6words: result.content.h6words,
    // hostname: result.content.hostname, pathname: result.content.pathname,
  } catch (error) {
    console.error(error)
  }
})

router.post('/recs', (req, res, next) => {
  try {
    //get the news recommendations based on keywords from the news API
    const newsapi = new NewsAPI(process.env.NEWSAPI)
    newsapi.v2
      .everything({
        q: `${req.body.keywordOne} OR ${req.body.keywordTwo} OR ${req.body.keywordThree}`,
        language: 'en',
        sortBy: 'relevancy',
        page: 1,
      })
      .then((response) => {
        res.send(response.articles)
      })
  } catch (err) {
    next(err)
  }
})

//if the user has no saved articles, send top headlines instead for recommendation
router.get('/defaultrecs', (req, res, next) => {
  try {
      const newsapi = new NewsAPI(process.env.NEWSAPI)
      newsapi.v2.topHeadlines({
        language: 'en',
        country: 'us',
        page: 1
      }).then(response => {
        res.send(response.articles)
      });
  } catch (err) {
    next(err)
  }
})
