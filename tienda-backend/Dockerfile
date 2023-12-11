# Utiliza una imagen de Node.js en la versión 18.18.0 como base para la etapa de compilación
FROM node:18.18.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y el código fuente
COPY package.json .
COPY . ./

# Instala las dependencias y realiza la compilación
RUN npm install
RUN npm run build

# Expone el puerto en el que se ejecuta tu aplicación (ajusta el puerto según tu aplicación)
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["sh", "-c", "sleep 30 && node ./dist/app.js"]
