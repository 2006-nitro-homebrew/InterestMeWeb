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

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getArticles(user.uid)
      } else {
        console.log()
      }
    })
  }

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

  renderTableHeader() {
    let header = ['Saved List', 'Original Source', 'Keywords', 'Remove Article']
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    let allList = this.props.list

    return (
      // <div>
      //   <h2 id="title">Saved Reading List</h2>
      //   {allList.length == 0 ? <h2>Nothing Saved</h2> : console.log()}
      //   <table id="readinglist">
      //     <tbody>
      //       {allList.length > 0 ? (
      //         <tr>{this.renderTableHeader()}</tr>
      //       ) : (
      //         console.log()
      //       )}
      //       {allList.length > 0
      //         ? allList.map((doc) => (
      //             <tr key={doc.id}>
      //               <td>
      //                 <Link to={`../readinglist/${doc.id}`}>{doc.title}</Link>
      //               </td>
      //               <td>
      //                 <a href={doc.originalurl}>{doc.url}</a>
      //               </td>
      //               {doc.keywords ? (
      //                 <td>{doc.keywords.join(', ')}</td>
      //               ) : (
      //                 <td>No Keywords Found</td>
      //               )}
      //               <td>
      //                 <button
      //                   type="button"
      //                   onClick={(event) => this.handleClick(event, doc.id)}
      //                 >
      //                   Remove
      //                 </button>
      //               </td>
      //             </tr>
      //           ))
      //         : console.log()}
      //     </tbody>
      //   </table>
      // </div>
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
                style={{color: '#fafafa'}}
              >
                Saved Reading List
              </Typography>
            </Card>
            {/* {allList.length === 0 && <p>No Articles Saved</p>} */}

            <Table size="small" id="readinglist">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h4>Saved Articles</h4>
                  </TableCell>
                  <TableCell>
                    <h4>Source</h4>
                  </TableCell>
                  <TableCell>
                    <h4>Keywords</h4>
                  </TableCell>
                  <TableCell>
                    <h4>Remove Article</h4>
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
    // addArticle: (id) => dispatch(fetchAddArticle(id)),
  }
}

export default connect(mapState, mapDispatch)(ReadingList)
