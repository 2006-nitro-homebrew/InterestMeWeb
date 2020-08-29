import {createMuiTheme} from '@material-ui/core/styles'
import {grey, deepOrange} from '@material-ui/core/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
      light: grey[200],
    },
    secondary: {
      main: deepOrange[500],
      light: deepOrange[100],
      dark: deepOrange[800],
    },
  },
})
