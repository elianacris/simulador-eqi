import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Card = (props) => {

    return (
        <Box
            sx={{
                ...props.sx
            }}
        >
            <Paper sx={{
                backgroundColor: '#efefef'
            }} elevation={3}>
                <Typography sx={{
                    width: '100%',
                    height: '50px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    pt:'5px'
                }} variant='body1' textAlign={"center"}>
                    {props.title}
                </Typography>

                <Typography variant='body1' textAlign={"center"}>
                    {props.value}
                </Typography>
            </Paper>
        </Box>
    );
}
export default Card;