import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";


const InputCurrencyRHF = (props) => {
  const { name, label, required, control, sx } = props;
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
      sx={{ ...sx }}
    >
      <NumberFormat
        {...field}
        getInputRef={ref}
        // onValueChange={field.value}
        decimalSeparator=","
        thousandSeparator="."
        isNumericString={true}
        decimalScale={2}
        fixedDecimalScale={true}
        prefix="R$"
      />
    </TextField>
  )
}
export default InputCurrencyRHF;


