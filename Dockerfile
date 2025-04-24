# Dockerfile
FROM node:20.17.0

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Puerto expuesto (debe coincidir con el de tu aplicación)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]