const router = require('express').Router()
const {User} = require('../db/models')
const {scrapeAll} = require('../scraper')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/pull', async (req, res, next) => {
  try {
    const ARTICLE_URL =
      'http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html'
    scrapeAll(ARTICLE_URL).then((result) => console.log(result))
  } catch (error) {
    console.error(error)
  }
})
