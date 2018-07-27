import { createMuiTheme } from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors'

export default createMuiTheme({
    palette: {
        primary: {
          main: '#165788', 
          contrastText: '#ffffff'         
        },
        secondary: { 
          main: '#E91E63',          
        },
        accent: { 
            backgroundColor: grey.A700, 
            color: '#000',
        },
    },
});