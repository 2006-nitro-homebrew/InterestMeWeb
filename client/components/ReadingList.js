import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {fetchAddArticle} from '../store/addArticle'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

export class ReadingList extends React.Component {
  // constructor() {
  //   super();
  // }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getArticles(user.uid)
      } else {
      }
    })
  }

  renderTableHeader() {
    // let header = Object.keys(this.props.list[0]).filter(
    //   (key) => (key == 'title' || key == 'url')
    // )
    let header = ['Saved List','Original Source','Keywords']
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    let allList = this.props.list

    return (
      <div>
        <h3 id="title">Saved Reading List</h3>
        <table id="readinglist">
          <tbody>
            {allList.length > 0 ? (
              <tr>{this.renderTableHeader()}</tr>
            ) : (
              console.log()
            )}
            {allList.length > 0 ? (
              allList.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <Link to={`../readinglist/${doc.id}`}>{doc.title}</Link>
                  </td>
                  <td><a href={doc.originalurl}>{doc.url}</a></td>
                  {(doc.keywords)?<td>{doc.keywords.join(', ')}</td>:console.log()}
                </tr>
              ))
            ) : (
              <h1>Nothing Saved</h1>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    list: state.articles,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArticles: (uid) => dispatch(fetchArticles(uid)),
    // addArticle: (id) => dispatch(fetchAddArticle(id)),
  }
}

export default connect(mapState, mapDispatch)(ReadingList)
