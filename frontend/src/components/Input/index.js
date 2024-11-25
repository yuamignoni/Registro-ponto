import React from "react";
import * as C from "./styles";

const Input = ({
                 type,
                 name,
                 placeholder,
                 value,
                 onChange,
                 error,
                 required,
                 disabled
               }) => {
  return (
      <C.InputContainer>
        <C.Input
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={required ? `${placeholder} *` : placeholder}
            error={error}
            disabled={disabled}
        />
        {error && <C.ErrorMessage>{error}</C.ErrorMessage>}
      </C.InputContainer>
  );
};

export default Input;