import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
    typography: {
        fontFamily: 'Roboto'
    },
    palette: {
        primary: {
            light: '#969696',
            main:'#ffff',
            dark: '#969696',
            contrastText: '#000000'
        },
        secondary: {
            ligth:'#ed8e53',
            main: '#ed8e53',
            dark:'#ed8e53',
            contrastText: '#000000',
        },
        disabled: {
            main: '#969696',
            contrastText: '#000000',

        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});