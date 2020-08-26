const cheerio = require('cheerio')
const {JSDOM} = require('jsdom')
const axios = require('axios')

const ARTICLE_URL =
  'http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html'

async function scrapeAll(ARTICLE_URL) {
  async function scrapeContent(ARTICLE_URL) {
    try {
      const res = await axios.get(ARTICLE_URL, {
        headers: {'Access-Control-Allow-Origin': '*'},
      })
      console.log(res)
      const $ = cheerio.load(res.data)
      let article = $('body').html() //use article tag for those that have it
      return article
    } catch (err) {
      console.error(err)
    }
  }

  async function scrapeStyle(ARTICLE_URL) {
    let externalStyles = []
    let internalStyles = []
    try {
      const dom = await JSDOM.fromURL(ARTICLE_URL)
      const {document} = dom.window

      //query and save external styles (look for links that have rel='stylesheet' attribute)
      let external = document.querySelectorAll('link[rel="stylesheet"]')
      external.forEach((element) => externalStyles.push(element.href))

      //query and save internal styles
      let internal = document.querySelectorAll('style')
      internal.forEach((element) => internalStyles.push(element.innerHTML))

      return [externalStyles, internalStyles]
    } catch (err) {
      console.error(err)
    }
  }

  //merge external and internal styles into one stylesheet
  let extStyle, intStyle
  ;[extStyle, intStyle] = await scrapeStyle(ARTICLE_URL)

  let allStyles = intStyle.slice() //copy over internal styles

  for (const styleLink of extStyle) {
    let {data: styling} = await axios.get(styleLink, {
      headers: {'Access-Control-Allow-Origin': '*'},
    })
    allStyles.push(styling)
  }

  return {
    content: await scrapeContent(ARTICLE_URL),
    styles: allStyles,
  }
}

module.exports = {scrapeAll}
// replace console.log with function to write it to database
// scrapeAll(ARTICLE_URL).then((result) => console.log(result));

// "proxy": "http://63.160.42.145:3128@rr150159_gmail_com:FRpjcMbKYb",
