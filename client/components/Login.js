import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'

import {
  Container,
  Typography,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Card,
} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}))

const Auth = (props) => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()

  return (
    // <div>
    //   <form onSubmit={handleSubmit} name={name}>
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <button type="submit">{displayName}</button>
    //     </div>
    //     <div>{error}</div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    //   {/* <a href="/auth/google">{displayName} with Google</a> */}
    // </div>

    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Card
        className={classes.paper}
        style={{padding: '50px', marginTop: '100px'}}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {displayName}
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
            name={name}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{marginLeft: 15}}
            >
              {displayName}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Card>
    </Container>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(Auth)
export const Signup = connect(mapSignup, mapDispatch)(Auth)

// export default Login;

// Login.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
