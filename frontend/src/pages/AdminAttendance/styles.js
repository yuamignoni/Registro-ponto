import styled from "styled-components";

export const MainPage = styled.div`
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20%;
  margin-top: 1.5%;
  background-color: white;
  min-height: 80vh;
  width: 60vw;
  padding: 20px;
`;

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`;

export const SelectContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    border-color: #046ee5;
    outline: none;
  }
`;

export const TableContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

export const TableResponsive = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
  }

  th {
    background-color: #046ee5;
    color: white;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  
  &:after {
    content: "";
    width: 30px;
    height: 30px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #046ee5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;