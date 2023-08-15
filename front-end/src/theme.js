import { red, indigo, blueGrey, teal, grey } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles';



const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          // primary: {
          //   main: '#ff5252',
          // },
          background: {
            default: grey[50],
          },
        },
      },
      dark: {
        palette: {
          // primary: {
          //   main: '#000',
          // },
          background: {
            default: '#090c1d'
          },
          text: {
            primary: grey[300],
          }
        },
      },
    },
    // ...other properties
  });

export default theme;