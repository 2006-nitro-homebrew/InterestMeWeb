import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {fetchAddArticle} from '../store/addArticle'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

export class ReadingList extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getArticles(user.uid)
      } else {
        console.log()
      }
    })
  }

  handleClick(event,id) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users')
        .doc(user.uid)
        .collection('savedOffline')
        .doc(id)
        .delete()
      } else {
        console.log()
      }
    })
  }

  renderTableHeader() {
    let header = ['Saved List','Original Source','Keywords', 'Remove Article']
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    let allList = this.props.list

    return (
      <div>
        <h2 id="title">Saved Reading List</h2>
        {allList.length == 0?<h2>Nothing Saved</h2>:console.log()}
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
                  {(doc.keywords)?<td>{doc.keywords.join(', ')}</td>:<td>No Keywords Found</td>}
                  <td><button type='button' onClick={(event) => this.handleClick(event,doc.id)}>Remove</button></td>
                </tr>
              ))
            ) : (
              console.log()
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
