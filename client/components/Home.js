import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme} from '../theme'
import {Paper, Button, Grid, Typography} from '@material-ui/core'
import {InterestMe} from './index'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardStyle: {},
}))

const Home = ({isLoggedIn}) => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn && (
        <div className="welcome-user">
          <Grid container spacing={3}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Paper
                style={{
                  marginTop: '30px',
                  padding: '15px',
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    marginLeft: '30px',
                    marginTop: '20px',
                    paddingBottom: '30px',
                    fontWeight: 200,
                  }}
                >
                  Welcome back!
                </Typography>

                <InterestMe articleCount={5} />
                <p style={{paddingBottom: '20px'}}></p>
              </Paper>
            </Grid>
            <Grid item xs={1} />
          </Grid>
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
            <Typography
              variant="h3"
              style={{fontWeight: 350, paddingTop: '20px'}}
            >
              Welcome to InterestMe
            </Typography>
            <Typography variant="h6" style={{padding: '20px'}}>
              The best way to browse and save your favorite articles
            </Typography>

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
              <Typography variant="h6" style={{fontWeight: 350}}>
                <p>Use the Browser Extension to save your article.</p>
                <p>View your favorite articles even if you are offline!</p>
                <p>
                  Enjoy countless recommendations based on your saved articles.
                </p>
              </Typography>
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
