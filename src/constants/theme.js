import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif;'
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
    }
});