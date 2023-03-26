import React from "react";
import { TextFieldStyled } from "./Textfield";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  variant: any;
  size: any;
  fullWidth: boolean;
  onChange: any;
  value: any;
  helperText: any;
  error: any;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  variant,
  size,
  fullWidth,
  onChange,
  value,
  helperText,
  error,
}: Props) => {
  return (
    <>
      <TextFieldStyled
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        variant={variant}
        size={size}
        fullWidth
        onChange={onChange}
        value={value}
        helperText={helperText}
        error={error}
      />
    </>
  );
};

export default TextField;
