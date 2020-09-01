const router = require('express').Router()
const { scrapeAll } = require('../scraper')
const db = require('../db/index')
const firebase = require('firebase')
const stoplist = require('../stoplist')
const wordhash = require('../wordhash')
const NewsAPI = require('newsapi');
require('../../secrets')

module.exports = router

router.post('/pull', async (req, res, next) => {
  try {
    scrapeAll(req.body.url).then((result) => {
      let savedResult = { content: result.content.article, styles: result.styles }
      let m = new Map();
      const customweight = (result.content.htmlwords.length > 150) ? 0.3 : 0.6
      console.log(customweight)
      wordhash(result.content.htmlwords, customweight, m)
      wordhash(result.content.h1words, 6, m)
      wordhash(result.content.h2words, 5, m)
      wordhash(result.content.h3words, 4, m)
      wordhash(result.content.h4words, 2, m)
      wordhash(result.content.h5words, 2, m)
      wordhash(result.content.h6words, 2, m)
      wordhash(result.content.title.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").split(" "), 5, m)
      wordhash(result.content.hostname, 5, m)
      wordhash(result.content.pathname, 4, m)

      for (let i = 0; i < stoplist.length; i++) {
        m.delete(stoplist[i])
      }
      m.delete('')
      let arr = [...m.entries()]
      let sortedarr = arr.sort(function (a, b) {
        return b[1] - a[1];
      })
      let keywords = []
      if (sortedarr.length >= 3) {
        while (keywords.length < 3){
          let add = sortedarr.shift()[0]
          if(add.length > 2 && add.length < 15){
            keywords.push(add)
          }
        }
      }
      let random = Math.floor(Math.random() * Math.floor(150));
      firebase.firestore()
        .collection('users')
        .doc(req.body.userId)
        .collection('savedOffline')
        .add({
          html: savedResult, title: result.content.title, url: result.content.url,
          originalurl: result.content.originalurl, keywords, random
        })
    })
    res.send(200)

  } catch (error) {
    console.error(error)
  }
})


router.post('/recs', (req, res, next) => {
  try {
      const newsapi = new NewsAPI(process.env.NEWSAPI)
      newsapi.v2.everything({
        q: `${req.body.keywordOne} OR ${req.body.keywordTwo} OR ${req.body.keywordThree}`,
        language: 'en',
        sortBy: 'relevancy',
        page: 1
      }).then(response => {
        res.send(response.articles)
      });


  } catch (err) {
    next(err)
  }
})
