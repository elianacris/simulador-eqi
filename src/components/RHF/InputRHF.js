import React from "react";

import TextField from '@mui/material/TextField';
import { useController } from "react-hook-form";



const InputRHF = (props) => {
    const { label, required, name, control, sx, placeholder, color} = props;
    const { field, fieldState: { invalid, error } } = useController({ name, control });
    const { ref } = field;

    return (
        <TextField
            {...field}
            inputRef={ref}
            label={label}
            error={invalid}
            helperText={error?.message}
            required={Boolean(required)}
            placeholder={placeholder}
            variant="standard"
            sx={{...sx }}
            color={color}
        />
    )
}
export default InputRHF;