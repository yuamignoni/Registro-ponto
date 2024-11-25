# Etapa 1: Construção
FROM node:18 AS builder

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do código
COPY src .

# Expõe a porta onde o backend será executado
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]
