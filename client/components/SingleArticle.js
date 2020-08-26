import React from 'react'
import {connect} from 'react-redux'
import {fetchArticle} from '../store/singleArticle'
import firebase from 'firebase'
import HtmlToReactParser from 'html-to-react'

export class SingleArticle extends React.Component {
  // constructor() {
  //   super();
  // }

  async componentDidMount() {
    const articleId = this.props.match.params.articleId
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getArticle(user.uid, articleId)
      } else {
      }
    })
  }

  render() {
    let article = this.props.article
    let html = article.html
    let reactElement
    let parser = new HtmlToReactParser.Parser()

    if (html) {
      reactElement = parser.parse(html.content)
      // console.log('REACT element -->', reactElement, typeof reactElement)
      // console.log(html.styles, typeof html.styles)
    }

    // if (html) {
    // let parsedHTMLStyles = html.styles.map(x.slice(1))
    // console.log('STYLES', parsedHTMLStyles)
    // }

    return (
      <div>
        {html &&
          html.styles.map((styleString) => {
            return (
              <style type="text/css" key={html.styles.indexOf(styleString)}>
                {styleString.slice(1, styleString.length - 1)}
              </style>
            )
          })}
        {html && reactElement}
      </div>
    )
  }
}

const mapState = (state) => {
  return {article: state.article}
}

const mapDispatch = (dispatch) => {
  return {
    getArticle: (uid, id) => dispatch(fetchArticle(uid, id)),
  }
}

export default connect(mapState, mapDispatch)(SingleArticle)
