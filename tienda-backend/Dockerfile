# Utiliza una imagen de Node.js en la versión 18.18.0 como base para la etapa de compilación
FROM node:18.18.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia solo el archivo package.json primero para aprovechar la caché de capas de Docker
COPY package.json .

# Instala las dependencias
RUN npm install --ignore-scripts

# Copia el resto de los archivos (ignora node_modules si está en el mismo directorio)
COPY . .

# Realiza la compilación
RUN npm run build

# Expone el puerto en el que se ejecuta tu aplicación (ajusta el puerto según tu aplicación)
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["sh", "-c", "sleep 30 && node ./dist/app.js"]
