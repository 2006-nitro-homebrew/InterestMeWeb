import React from 'react'
import { connect } from 'react-redux'
import {fetchAddArticle} from '../store/addArticle'
import firebase from 'firebase'

export class AddArticle extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault()
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.addArticle(user.uid)
            } else {
            }
        })
      }

    render() {

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

const mapState = state => {
    return { article: state.article }
}

const mapDispatch = dispatch => {
    return {
        addArticle: (id) => dispatch(fetchAddArticle(id))
    }
}

export default connect(mapState, mapDispatch)(AddArticle)
