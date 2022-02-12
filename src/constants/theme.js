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

    },

    //MuiFormControl-root MuiTextField-root
    // input: {
    //     MuiTextField: {
    //         styleOverrides: {
    //             root: {
    //                 color: '#578453'
    //                 // '&.MuiTextField-root': {
    //                 //     width: '75%',
    //                 //     mt: 3,
    //                 //     gridColumn: {
    //                 //         md: 'span 3',
    //                 //         sm: 'span 3',
    //                 //         xs: 'span 6'
    //                 //     }
    //                 // }
    //             }

    //         }
    //     }

    // }

});