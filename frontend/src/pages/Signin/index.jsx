import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/Home");
    } catch (error) {
      setError("Erro ao fazer login: Verifique suas credenciais.");
    }

  };

  return (
    <C.Container>
      <C.Label>LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua password"
          value={password}
          onChange={(e) => [setpassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};

export default Signin;
