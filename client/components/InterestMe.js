import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {fetchAddArticle} from '../store/addArticle'
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {fetchRecs} from '../store/recs'
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

import PostAddIcon from '@material-ui/icons/PostAdd'

class InterestMe extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    let random = Math.floor(Math.random() * Math.floor(150))
    console.log(random)
    // firebase.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //         firebase
    //         .firestore()
    //         .collection('users')
    //         .doc(user.uid)
    //         .collection('savedOffline')
    //         .where("random", '<', random)
    //         // .orderBy("")
    //         .limit(1)
    //         .get()
    //         .then(article => {
    //             console.log(article.exists)
    //             if (!article.exists) return;
    //             let data = article.data()
    //             console.log(data)
    //         })
    // this.props.getArticles(user.uid)
    // this.props.getRecs('trump', 'white', 'house')
    //     } else {
    //         console.log()
    //     }
    // })
    this.props.getRecs('trump', 'white', 'house')
  }

  handleClick(event, url) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.fetchAddArticle(user.uid, url)
      } else {
        console.log('error on add article')
      }
    })
  }

  render() {
    let allRecs = this.props.recs
    console.log('RECS', allRecs)

    return (
      //   <div>
      //     {allRecs.map((article) => (
      //       <div key={article.title}>
      //         <h1>
      //           <a href={article.url}>{article.title}</a>
      //         </h1>
      //         <h3>{article.description}</h3>
      //       </div>
      //     ))}
      //   </div>

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
                Interest Me
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    getArticles: (uid) => dispatch(fetchArticles(uid)),
    fetchAddArticle: (id, url) => dispatch(fetchAddArticle(id, url)),
    getRecs: (kw1, kw2, kw3) => dispatch(fetchRecs(kw1, kw2, kw3)),
  }
}

export default connect(mapState, mapDispatch)(InterestMe)
