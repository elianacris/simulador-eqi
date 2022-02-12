import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import NumberFormat from 'react-number-format';

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
                    fontWeight: 'bold',
                    fontSize: '14px',
                    pt: '5px'
                }} variant='body1' textAlign={"center"}>
                    {props.title}
                </Typography>
                <Box
                    sx={{
                        textAlign: 'center',
                        fontSize: '16px',
                        pb: 1,
                        mt: 3,
                        color: props.color ? props.color : ''
                    }}>
                    <NumberFormat
                        value={props.value}
                        displayType={'text'}
                        prefix={props.prefix}
                        suffix={props.suffix}
                        decimalScale={2}
                        decimalSeparator=","
                        thousandSeparator="."
                        fixedDecimalScale={true}
                    />

                </Box>


            </Paper>
        </Box>
    );
}
export default Card;