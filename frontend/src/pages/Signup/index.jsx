import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from '../../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = [
    { value: "user", label: "Usuário" },
    { value: "manager", label: "Gerente" }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      // Remove confirmPassword antes de enviar
      const { confirmPassword, ...submitData } = formData;

      await api.post("/users", submitData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Usuário criado com sucesso!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
      });
      setErrors({});
    } catch (error) {
      const message = error.response?.data?.message || "Erro ao criar usuário.";
      setErrors(prev => ({ ...prev, submit: message }));
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || Object.keys(errors).length > 0;

  return (
      <C.Container>
        <C.Label>CADASTRAR USUÁRIO</C.Label>
        <C.Content>
          <Input
              type="text"
              name="name"
              placeholder="Digite o nome completo"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
          />
          <Input
              type="email"
              name="email"
              placeholder="Digite o e-mail"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
          />
          <Input
              type="password"
              name="password"
              placeholder="Digite a senha"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
          />
          <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
          />
          <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
          />
          {errors.submit && <C.labelError>{errors.submit}</C.labelError>}
          <Button
              Text="Cadastrar"
              onClick={handleSubmit}
              loading={loading}
              disabled={isSubmitDisabled}
          />
        </C.Content>
      </C.Container>
  );
};

export default Signup;