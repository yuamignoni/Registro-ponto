import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import api from '../../services/api';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as C from "./styles";

const AdminAttendance = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    // Verificar se o usuário é manager
    useEffect(() => {
        if (user?.role !== 'manager') {
            navigate('/');
        }
    }, [user, navigate]);

    // Buscar lista de usuários
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                setError('Erro ao carregar usuários');
            }
        };

        fetchUsers();
    }, []);

    // Buscar pontos do usuário selecionado
    useEffect(() => {
        const fetchAttendance = async () => {
            if (!selectedUser) return;

            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const response = await api.get(`/attendance/${selectedUser}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAttendance(response.data);
                setError('');
            } catch (error) {
                setError('Erro ao carregar pontos');
                setAttendance([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [selectedUser]);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        };
    };

    return (
        <C.MainPage>
            <Navbar />
            <C.Container>
                <C.Wrapper>
                    <C.Title>Controle de Pontos</C.Title>

                    <C.SelectContainer>
                        <C.Select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                        >
                            <option value="">Selecione um usuário</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </C.Select>
                    </C.SelectContainer>

                    <C.TableContainer>
                        {loading ? (
                            <C.LoadingSpinner />
                        ) : error ? (
                            <C.NoDataMessage>{error}</C.NoDataMessage>
                        ) : attendance.length > 0 ? (
                            <C.TableResponsive>
                                <C.Table>
                                    <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Entrada</th>
                                        <th>Saída</th>
                                        <th>Tempo Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {attendance.map((record) => {
                                        const checkIn = formatDateTime(record.check_in);
                                        const checkOut = record.check_out
                                            ? formatDateTime(record.check_out)
                                            : null;

                                        let totalTime = '';
                                        if (checkOut) {
                                            const diff = new Date(record.check_out) - new Date(record.check_in);
                                            const hours = Math.floor(diff / (1000 * 60 * 60));
                                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                                            totalTime = `${hours}h ${minutes}min`;
                                        }

                                        return (
                                            <tr key={record.id}>
                                                <td>{checkIn.date}</td>
                                                <td>{checkIn.time}</td>
                                                <td>{checkOut ? checkOut.time : "Em aberto"}</td>
                                                <td>{totalTime || "Em andamento"}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </C.Table>
                            </C.TableResponsive>
                        ) : selectedUser ? (
                            <C.NoDataMessage>Nenhum registro encontrado</C.NoDataMessage>
                        ) : (
                            <C.NoDataMessage>Selecione um usuário para ver os registros</C.NoDataMessage>
                        )}
                    </C.TableContainer>
                </C.Wrapper>
            </C.Container>
        </C.MainPage>
    );
};

export default AdminAttendance;