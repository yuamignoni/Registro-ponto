import React,{useState, useEffect} from 'react'
import Navbar from "../../components/Navbar";
// import Button from "../../components/Button";
// import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// // import * as C from "./styles";
import api from '../../services/api'
import { View } from '../../components/View';
import {
  MainPage,
  Container,
  Wrapper,
  Title,
  FormContainer,
  ViewContainer,
  FormGroup,
  Button,
  Table,
  TableResponsive
} from "./styles";

const getDatafromLS = () => {
  const data = localStorage.getItem('records');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const History = ({ records }) => {
  // Ordena os registros por `check_in` em ordem decrescente e seleciona os últimos 5
  const recentRecords = records
      .sort((a, b) => new Date(b.check_in) - new Date(a.check_in))
      .slice(0, 5);

  return (
      <ViewContainer>
        {records.length > 0 ? (
            <TableResponsive>
              <Table>
                <thead>
                <tr>
                  <th>Data</th>
                  <th>Entrada</th>
                  <th>Saída</th>
                </tr>
                </thead>
                <tbody>
                {recentRecords.map((record) => {
                  const checkInDate = new Date(record.check_in);
                  const checkOutDate = record.check_out ? new Date(record.check_out) : ''

                  return (
                      <tr key={record.id}>
                        <td>{checkInDate.toLocaleDateString()}</td>
                        <td>{checkInDate.toLocaleTimeString()}</td>
                        <td>{checkOutDate ? checkOutDate.toLocaleTimeString() : "Sem saída"}</td>
                      </tr>
                  );
                })}
                </tbody>
              </Table>
            </TableResponsive>
        ) : (
            <div>Nenhum ponto foi adicionado até o momento</div>
        )}
      </ViewContainer>
  );
};

const Home = () => {
  const [records, setRecords] = useState([]);
  const [update, setUpdate] = useState(false);

  const handlePunch = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post("attendance", {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Ponto registrado com sucesso!");
      setUpdate(!update)
    } catch (error) {
      alert("Erro ao registrar o ponto.");
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/attendance", { headers: { Authorization: `Bearer ${token}` } });
        setRecords(response.data);
      } catch (error) {
        alert("Erro ao carregar histórico.");
      }
    };

    fetchRecords();
  }, [update]);

  return (
      <MainPage>
        <Navbar />
        <Container>
          <Wrapper>
            <Title>Ponto Senai</Title>
            <div>
              <Button type="submit" onClick={handlePunch}>
                Bater Ponto
              </Button>

              {/* Componente de histórico */}
              <History records={records} />
            </div>
          </Wrapper>
        </Container>
      </MainPage>
  );
};

export default Home;