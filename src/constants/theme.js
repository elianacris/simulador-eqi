import { createTheme } from '@mui/material/styles'
export let theme = createTheme({
    typography: {
        //fontFamily: 'Helvetica'
    },
    components: {
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    "&.Mui-selected": {
                        backgroundColor: '#ed8e53',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: '#ed8e53',
                            color: '#fff'
                        }
                    }
                }

            }
        }

    },

});
