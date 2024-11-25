# Use uma imagem base com Node.js
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o diretório de trabalho no container
COPY . .

# Compila o projeto React para produção
RUN npm run build

# Usa uma imagem mais leve para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos estáticos do build React para o diretório de distribuição do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expõe a porta que o Nginx usará
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
