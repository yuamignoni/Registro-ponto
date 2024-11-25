import React from "react";
import * as C from "./styles";

const Button = ({ Text, onClick, loading, disabled }) => {
  return (
      <C.Button onClick={onClick} disabled={loading || disabled}>
        {loading ? <C.LoadingSpinner /> : Text}
      </C.Button>
  );
};

export default Button;