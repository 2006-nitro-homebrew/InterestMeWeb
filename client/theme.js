import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {grey, amber} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
      light: grey[200],
    },
    secondary: {
      main: amber[500],
      light: amber[100],
      dark: amber[800],
    },
  },
})
