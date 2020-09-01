import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Paper,
  IconButton,
  Card,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'

export class ReadingList extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  //Component will render articles from the redux store based on the user id passed in
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getArticles(user.uid)
      } else {
        console.log()
      }
    })
  }

  //Delete the saved article based on the user that is logged in firestore
  handleClick(event, id) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('savedOffline')
          .doc(id)
          .delete()
      } else {
        console.log()
      }
    })
  }

  render() {
    let allList = this.props.list

    return (

      <ThemeProvider theme={theme}>
        <Container>
          <Paper style={{padding: '15px', marginTop: '50px'}} elevation={3}>
            <Card
              align="center"
              elevation={3}
              style={{
                paddingTop: '10px',
                marginTop: '-40px',
                borderRadius: '3px',
                backgroundColor: '#424242',
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                style={{color: '#fafafa', fontWeight: 200}}
              >
                Saved Reading List
              </Typography>
            </Card>
            <TableContainer
              component={Paper}
              elevation={0}
              style={{marginTop: '10px'}}
            >
              <Table size="small" id="readinglist">
                <TableHead style={{backgroundColor: '#f5f5f5'}}>
                  <TableRow>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>
                        SAVED ARTICLES
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>SOURCE</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>
                        KEYWORDS
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>REMOVE</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allList.map((doc) => {
                    return (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <Link to={`../readinglist/${doc.id}`}>
                            {doc.title.length > 50 ? (
                              <p>{doc.title.slice(0, 50) + '...'}</p>
                            ) : (
                              <p>{doc.title}</p>
                            )}
                          </Link>
                        </TableCell>

                        <TableCell>
                          <a href={doc.originalurl}>{doc.url}</a>
                        </TableCell>

                        <TableCell>
                          {doc.keywords ? (
                            <p>{doc.keywords.join(', ')}</p>
                          ) : (
                            <p>No Keywords Found</p>
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={(event) => this.handleClick(event, doc.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </ThemeProvider>
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
  }
}

export default connect(mapState, mapDispatch)(ReadingList)
