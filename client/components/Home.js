import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'
import {Paper, Button} from '@material-ui/core'
import {AddArticle} from './index'

const Home = ({isLoggedIn}) => {
  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn && (
        <div className="welcome-user">
          <Paper
            style={{
              marginTop: '40px',
              padding: '15px',
            }}
          >
            <h1>Welcome back!</h1>
            <AddArticle />
          </Paper>
        </div>
      )}

      {!isLoggedIn && (
        <div className="welcome-all">
          <Paper
            style={{
              marginTop: '80px',
              padding: '15px',
              paddingTop: '0px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
            }}
          >
            <div>
              <h1>Welcome to InterestMe</h1>
              <h4>The best way to browse and save your favorite articles</h4>
            </div>

            <div>
              <Link to="/login" style={{textDecoration: 'none', color: '#FFF'}}>
                <Button
                  className="welcome-button"
                  variant="contained"
                  color="secondary"
                >
                  Login
                </Button>
              </Link>
              <div className="divider" />
              <Link
                to="/signup"
                style={{textDecoration: 'none', color: '#FFF'}}
              >
                <Button
                  className="welcome-button"
                  variant="contained"
                  color="secondary"
                >
                  Signup
                </Button>
              </Link>
            </div>

            <div className="welcome-description-container">
              <p>Use the Browser Extension to save your article.</p>
              <p>View your favorite articles even if you are offline!</p>
              <p>
                Enjoy countless recommendations based on your saved articles.{' '}
              </p>
            </div>
          </Paper>
        </div>
      )}
    </ThemeProvider>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.email,
  }
}

// export default Home
export default connect(mapState)(Home)
