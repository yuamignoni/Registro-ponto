import styled from "styled-components";

export const MainPage = styled.div`
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20%;
  margin-top: 1.5%;
  background-color: white;
  height: 80vh;
  width:60vw;
  gap: 20px;
`;
export const Wrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Title = styled.h1`
  margin-top: 30px;
  text-align: center;
`;

export const Paragraph = styled.p`
  text-align: center;
  margin-top: 7px;
  font-weight: bold;
`;

export const FormContainer = styled.div`
  width: 500px;
  height: 75px;
  background-color: #e4e4e4;
  margin: 20px auto;
  padding: 20px;
`;

export const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 15px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#046ee5")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#087cff")};
  }
`;

export const ViewContainer = styled.div`
  min-width: 600px;
  background-color: #e4e4e4;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const TableResponsive = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
    text-align: left;
  }
`;

