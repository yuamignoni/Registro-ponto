# Attendance Management System

Este é um sistema completo para **gerenciamento de registros de ponto**, desenvolvido como uma aplicação web utilizando **React** no frontend e **Node.js** no backend. A solução permite registrar pontos de entrada e saída, consultar históricos, e administrar usuários, proporcionando um sistema eficiente para controle de horários.

---

## 🚀 **Problema Resolvido**
A dificuldade de registrar e monitorar horários de entrada e saída de colaboradores é comum em muitas empresas. Este sistema resolve isso permitindo:
- Registro automático de ponto (entrada/saída alternados).
- Consulta ao histórico de ponto do colaborador.
- Controle de acesso com autenticação baseada em **JWT**.
- Diferenciação entre permissões de **usuários comuns** e **gerentes**.

---

## 🛠️ **Tecnologias Utilizadas**
### **Frontend**
- **React**: Interface de usuário interativa.
- **Styled Somponents**: Estilização responsiva e customizável.
- **Axios**: Comunicação com o backend.
- **Nginx**: Servidor para o build de produção.

### **Backend**
- **Node.js + Express**: API REST para as funcionalidades do sistema.
- **Sequelize**: ORM para manipulação do banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Para autenticação segura.

### **Infraestrutura**
- **Docker**: Containers para isolar e executar a aplicação.
- **Docker Compose**: Orquestração de serviços frontend, backend e banco de dados.

---

## ⚙️ **Configuração e Inicialização**

### **1. Pré-requisitos**
- Docker e Docker Compose instalados no sistema.

### **2. Estrutura do Projeto**
```
project/
│
├── backend/
├── frontend/
└── docker-compose.yml
```

### **3. Iniciar a Aplicação**
1. Clone este repositório:
   ```bash
   git clone https://github.com/yuamignoni/Registro-ponto.git
   cd project
   ```

2. Inicie os serviços com **Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. Acesse as interfaces:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 📋 **Funcionalidades do Sistema**
### **Frontend**
- **Página de Login**: Autenticação de usuários.
- **Registro de Ponto**: Registro automático de entrada ou saída.
- **Histórico de Pontos**: Consulta dos registros de ponto.

### **Backend**
- **Endpoints da API**:
    - `/auth/login`: Login de usuários.
    - `/attendance`: Registro e consulta de pontos.
    - `/users`: Gerenciamento de usuários (somente gerentes).

---

## 🗂️ **Comandos Úteis**

### **Parar a Aplicação**
```bash
docker-compose down
```

### **Remover Containers e Volumes**
```bash
docker-compose down -v
```

### **Acessar o Banco de Dados**
```bash
docker exec -it <db-container-id> psql -U postgres -d attendance_db
```

---

## 🧪 **Dados de Teste**
Após inicializar, o sistema vem com dados seed para testes:
- **Usuário Admin**:
    - **Email**: `admin`
    - **Senha**: `admin`
    - **Função**: `manager`
- **Usuário Fake**:
    - **Email**: `user1@example.com`
    - **Senha**: `password123`
    - **Função**: `user`

---

## 🔧 **Customizações**
- Para alterar variáveis de ambiente, edite o arquivo `docker-compose.yml` e reinicie os serviços.
- Seeds podem ser configurados em `src/seeders`.

---
