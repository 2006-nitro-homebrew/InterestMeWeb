import React from 'react'
import {connect} from 'react-redux'
import {fetchAddArticle} from '../store/addArticle'
import firebase from 'firebase'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'
import MuiAlert from '@material-ui/lab/Alert'

import {
  Container,
  Button,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

class AddArticle extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const url = evt.target.url.value
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.fetchAddArticle(user.uid, url)
      } else {
        console.log('error on add article')
      }
    })
  }

  render() {
    // console.log('STATUS ADDING -->', this.props.addArticle)

    // passes user id and article url to the thunk. modify the thunk to accept both arguments. pull user id using
    // oncall Auth (check readingList) -- pulls ID and task that in
    // pull corresponding documents from here
    return (
      <ThemeProvider theme={theme}>
        <Container>
          {this.props.addArticle === 'SUCCESS' && (
            <Alert severity="success">Article successfully added!</Alert>
          )}
          {this.props.addArticle === 'ERROR' && (
            <Alert severity="error">Failed to add article</Alert>
          )}

          <Paper style={{padding: '15px', marginTop: '40px'}} elevation={0}>
            <Typography component="h2" variant="h5" gutterBottom>
              Add Article
            </Typography>

            <form onSubmit={this.handleSubmit} name={name}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Article URL"
                id="url"
                name="url"
                type="url"
                autoFocus
                style={{marginLeft: '-15px', paddingTop: '40px'}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Article
              </Button>
            </form>
          </Paper>
        </Container>
      </ThemeProvider>
    )
  }
}

const mapState = (state) => {
  // return {article: state.article}
  return {addArticle: state.addArticle}
}

const mapDispatch = (dispatch) => {
  return {
    fetchAddArticle: (id, url) => dispatch(fetchAddArticle(id, url)),
  }
}

export default connect(mapState, mapDispatch)(AddArticle)
