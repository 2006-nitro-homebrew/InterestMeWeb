import React from 'react'
import {connect} from 'react-redux'
import {fetchArticles} from '../store/articles'
import {Link} from 'react-router-dom'
import firebase from 'firebase'

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

      <Container>
        <Paper style={{padding: '10px', marginTop: '50px'}} elevation={3}>
          <Typography component="h2" variant="h5" color="primary" gutterBottom>
            Saved Reading List
          </Typography>

          {/* {allList.length === 0 && <p>No Articles Saved</p>} */}

          <Table size="small" id="readinglist">
            <TableHead>
              <TableRow>
                <TableCell>Saved Articles</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Keywords</TableCell>
                <TableCell>Remove Article</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allList.map((doc) => {
                return (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <Link to={`../readinglist/${doc.id}`}>{doc.title}</Link>
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

                    <TableCell>
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
