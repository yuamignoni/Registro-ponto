import styled from "styled-components";
export const InputContainer = styled.div`
    width: 100%;
    position: relative;
`;

export const Input = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border: 1px solid ${props => props.error ? '#ff3333' : '#ccc'};
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border: 1px solid ${props => props.error ? '#ff3333' : '#676767'};
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const RequiredMark = styled.span`
  color: #ff3333;
  margin-left: 4px;
`;

export const ErrorMessage = styled.span`
  color: #ff3333;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;