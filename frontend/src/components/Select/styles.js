import styled from "styled-components";

export const Select = styled.select`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  color: #676767;

  &:focus {
    border: 1px solid #676767;
  }
`;