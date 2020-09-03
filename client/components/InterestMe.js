import React from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../store/articles'
import { fetchAddArticle, clearAdd } from '../store/addArticle'
import firebase from 'firebase'

import { fetchRecs, fetchDefaultRecs } from '../store/recs'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import MuiAlert from '@material-ui/lab/Alert'

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

import PostAddIcon from '@material-ui/icons/PostAdd'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


class InterestMe extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.clearAdd()
    let random = Math.floor(Math.random() * Math.floor(150));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('savedOffline')
          .where("random", '<', random)
          .orderBy("random", "desc")
          .limit(1)
          .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
            if (data.length > 0) {
              this.props.getRecs(data[0].keywords[0], data[0].keywords[1], data[0].keywords[2])
            }
            else {
              firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .collection('savedOffline')
                .where("random", '>', random)
                .orderBy("random")
                .limit(1)
                .onSnapshot(snapshot2 => {
                  const data2 = snapshot2.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                  }))
                  if (data2.length > 0) {
                    this.props.getRecs(data2[0].keywords[0], data2[0].keywords[1], data2[0].keywords[2])
                  }
                  else {
                    this.props.getDefaultRecs()
                  }
                })
            }
          })
      } else {
        console.log()
      }
    })
  }

  handleClick(event, url) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.clearAdd()
        this.props.fetchAddArticle(user.uid, url)
      } else {
        console.log('error on add article')
      }
    })
  }

  render() {
    let allRecs = this.props.recs

    return (
      <ThemeProvider theme={theme}>
        <Container>
          {this.props.addArticle === 'SUCCESS' && (
            <Alert severity="success">Article successfully added!</Alert>
          )}
          {this.props.addArticle === 'ERROR' && (
            <Alert severity="error">Failed to add article. Article not supported.</Alert>
          )}
          <Paper style={{ padding: '15px', marginTop: '50px' }} elevation={3}>
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
                style={{ color: '#fafafa', fontWeight: 200 }}
              >
                Interest Me
              </Typography>
            </Card>

            <TableContainer
              component={Paper}
              elevation={0}
              style={{ marginTop: '10px' }}
            >
              <Table size="small" id="readinglist">
                <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>
                      <Typography style={{ fontWeight: 700 }}>TITLE</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontWeight: 700 }}>
                        ARTICLE CONTENT
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ fontWeight: 700 }}>ADD</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allRecs.map((article) => {
                    return (
                      <TableRow key={article.title}>
                        <TableCell>
                          <a href={article.url}>{article.title}</a>
                        </TableCell>
                        <TableCell>
                          <p> {article.description}</p>
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={(event) =>
                              this.handleClick(event, article.url)
                            }
                          >
                            <PostAddIcon />
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
    recs: state.recs,
    articles: state.articles,
    user: state.user,
    addArticle: state.addArticle
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArticles: (uid) => dispatch(fetchArticles(uid)),
    fetchAddArticle: (id, url) => dispatch(fetchAddArticle(id, url)),
    getRecs: (kw1, kw2, kw3) => dispatch(fetchRecs(kw1, kw2, kw3)),
    getDefaultRecs: () => dispatch(fetchDefaultRecs()),
    clearAdd: () => dispatch(clearAdd())
  }
}

export default connect(mapState, mapDispatch)(InterestMe)
