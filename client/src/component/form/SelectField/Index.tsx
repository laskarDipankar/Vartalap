import { MenuItem } from "@mui/material";
import React from "react";
import { SelectFieldStyled } from "./Selctfield";

interface SelectFieldProps {
  size: any;
  label: string;
  name: string;
  value: any;
  onChange: any;
  options: any;
  fullWidth: boolean;
}

const Index = ({
  label,
  name,
  value,
  onChange,
  options,
  size,
  fullWidth,
}: SelectFieldProps) => {
  return (
    <>
      <SelectFieldStyled
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        size={size}
        fullWidth={fullWidth}
      >
        {options.map((option: any) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </SelectFieldStyled>
    </>
  );
};

export default Index;
