import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {fetchAddArticle, clearAdd} from '../store/addArticle'
import firebase from 'firebase'

import {fetchRecs, fetchDefaultRecs} from '../store/recs'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'
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
    // random variable used for pulling a random articles in recommendations
    // used so recommendation list won't show the same articles upon refresh
    this.props.clearAdd()
    let random = Math.floor(Math.random() * Math.floor(150))
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('savedOffline')
          //pull the random number and check if the number is less than the random number generated
          .where('random', '<', random)
          //the greatest random number shows up first
          .orderBy('random', 'desc')
          //show the article that has the greatest random number
          .limit(1)
          //saved into data
          .onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            //check the data on the firebase to see if there is an article
            if (data.length > 0) {
              this.props.getRecs(
                data[0].keywords[0],
                data[0].keywords[1],
                data[0].keywords[2]
              )
            //if there is no article in there, there is no random number less than the generated random number
            } else {
              firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .collection('savedOffline')
            //pull the random number and check if the number is greater than the random number generated
                .where('random', '>=', random)
                .orderBy('random')
                .limit(1)

                .onSnapshot((snapshot2) => {
                  const data2 = snapshot2.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }))
                  if (data2.length > 0) {
                    this.props.getRecs(
                      data2[0].keywords[0],
                      data2[0].keywords[1],
                      data2[0].keywords[2]
                    )
                  } else {
                    //if user has no saved articles, unable to retrieve a random article for keywords to send to recommendation thunk
                    //pull default recommendation instead
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
      //if clicked, will get the current user on the Auth object and access the firestore DB accordingly
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
         //clears the 'success' or 'error' message after adding article
        this.props.clearAdd()
        //retrieves userId and url of article from the database
        this.props.fetchAddArticle(user.uid, url)
      } else {
        console.log('error on add article')
      }
    })
  }

  render() {
    let allRecs = this.props.recs
    let articleCount = this.props.articleCount
    allRecs = allRecs.slice(0, articleCount)

    return (
      <ThemeProvider theme={theme}>
        <Container>
          {this.props.addArticle === 'SUCCESS' && (
            <Alert severity="success">Article successfully added!</Alert>
          )}
          {this.props.addArticle === 'ERROR' && (
            <Alert severity="error">
              Failed to add article. Article not supported.
            </Alert>
          )}
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
                Interest Me - Articles You May Be Interested In
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
                      <Typography style={{fontWeight: 700}}>TITLE</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>
                        ARTICLE CONTENT
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontWeight: 700}}>ADD</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allRecs.map((article) => {
                    return (
                      <TableRow key={article.title}>
                        <TableCell>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {article.title}
                          </a>
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
    addArticle: state.addArticle,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArticles: (uid) => dispatch(fetchArticles(uid)),
    fetchAddArticle: (id, url) => dispatch(fetchAddArticle(id, url)),
    getRecs: (kw1, kw2, kw3) => dispatch(fetchRecs(kw1, kw2, kw3)),
    getDefaultRecs: () => dispatch(fetchDefaultRecs()),
    clearAdd: () => dispatch(clearAdd()),
  }
}

export default connect(mapState, mapDispatch)(InterestMe)
