import React from 'react'
import {connect} from 'react-redux'
import {fetchAddArticle} from '../store/addArticle'
import firebase from 'firebase'

class AddArticle extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // const formName = evt.target.name
    // const email = evt.target.email.value
    // const password = evt.target.password.value
    const url = evt.target.url.value
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('into add article for props',this.props)
        this.props.fetchAddArticle(user.uid, url)
      } else {
        console.log('error on add article')
      }
    })
  }

  render() {
    console.log('this is props',this.props)
    // passes user id and article url to the thunk. modify the thunk to accept both arguments. pull user id using
    // oncall Auth (check readingList) -- pulls ID and task that in
    // pull corresponding documents from here
    return (
      <div>

        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="url">

              <small>URL</small>
            </label>
            <input name="url" type="text" />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {article: state.article}
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddArticle: (id, url) => dispatch(fetchAddArticle(id, url)),
  }
}

export default connect(mapState, mapDispatch)(AddArticle)
