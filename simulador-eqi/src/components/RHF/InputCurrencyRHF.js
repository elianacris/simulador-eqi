import React from "react";
import { useController } from "react-hook-form";

import TextField from '@mui/material/TextField';
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;


  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      prefix="R$"
      decimalScale={2}
      decimalSeparator=","
      thousandSeparator="."
      fixedDecimalScale={true}
    />
  );
});

const InputCurrencyRHF = (props) => {
  const { label, required, name, control, sx, placeholder, disabled } = props;
  const { field, fieldState: { invalid, error } } = useController({ name, control });
  const { ref } = field;

  return (

    <TextField
      {...field}
      disabled={disabled ? true : false}
      InputProps={{ inputComponent: NumberFormatCustom }}
      inputRef={ref}
      label={label}
      error={invalid}
      helperText={error?.message}
      required={Boolean(required)}
      placeholder={placeholder}
      variant="standard"
      sx={{
        gridColumn: {
          md: 'span 3',
          sm: 'span 3',
          xs: 'span 6'
        },
        ...sx
      }}
    />

  )
}
export default InputCurrencyRHF;


