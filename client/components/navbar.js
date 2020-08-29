import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import {Menu} from '@material-ui/icons'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  // <div>
  //   <h2>Offline Reader</h2>
  //   <nav>
  //     {isLoggedIn ? (
  //       <div>
  //         {/* The navbar will show these links after you log in */}
  //         <Link to="/home">Home</Link>
  //         <Link to="/readinglist">Reading List</Link>
  //         <Link to="/interestMe">Interest Me</Link>
  //         <a href="#" onClick={handleClick}>
  //           Logout
  //         </a>
  //       </div>
  //     ) : (
  //       <div>
  //         {/* The navbar will show these links before you log in */}
  //         <Link to="/login">Login</Link>
  //         <Link to="/signup">Sign Up</Link>
  //       </div>
  //     )}
  //   </nav>
  // </div>
  <ThemeProvider theme={theme}>
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/" style={{textDecoration: 'none', color: '#FFF'}}>
          <Button color="inherit">Home</Button>
        </Link>
        {isLoggedIn ? (
          <div className="navButton">
            <Link
              to="/readinglist"
              style={{textDecoration: 'none', color: '#FFF'}}
            >
              <Button color="inherit">Reading List</Button>
            </Link>

            <Link
              to="/interestMe"
              style={{textDecoration: 'none', color: '#FFF'}}
            >
              <Button color="inherit">Interest Me</Button>
            </Link>

            <Link
              to="/addarticle"
              style={{textDecoration: 'none', color: '#FFF'}}
            >
              <Button color="inherit">Add Article</Button>
            </Link>

            <Button color="inherit">
              <a
                href="#"
                onClick={handleClick}
                style={{textDecoration: 'none', color: '#FFF'}}
              >
                Logout
              </a>
            </Button>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{textDecoration: 'none', color: '#FFF'}}>
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/signup" style={{textDecoration: 'none', color: '#FFF'}}>
              <Button color="inherit">Sign Up</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </ThemeProvider>
)

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.email,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
