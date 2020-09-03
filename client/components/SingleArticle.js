import React from 'react'
import {connect} from 'react-redux'
import {fetchArticle} from '../store/singleArticle'
import firebase from 'firebase'
import HtmlToReactParser from 'html-to-react'

import {Container, Paper} from '@material-ui/core'

export class SingleArticle extends React.Component {
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
    }

    return (
      <Container>
        <Paper style={{marginTop: '50px', marginBottom: '50px'}}>
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
        </Paper>
      </Container>
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
