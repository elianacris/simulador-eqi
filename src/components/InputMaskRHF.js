import { TextField } from "@material-ui/core";
import React from "react";
import { useController } from "react-hook-form";
import InputMask from "react-input-mask";


const InputMaskRHF = (props) => {
    const { label, mask, required, name, control, sx } = props;
    const { field, fieldState: { invalid, error } } = useController({ name, control });
    const { ref } = field;

    return (
        <InputMask
            mask={mask}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
        >
            {() => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={label}
                    error={invalid}
                    helperText={error?.message}
                    required={Boolean(required)}
                    sx={{ sx }}
                />
            )}
        </InputMask>
    )
}
export default InputMaskRHF;