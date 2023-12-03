require('dotenv').config();

const {
  Sequelize
} = require('sequelize');


const configuracion = {
  host:  process.env.NODE_ENV === "production" ? process.env.BASE_DATOS_HOST_PROD : process.env.BASE_DATOS_HOST_DEV,
  dialect:  process.env.NODE_ENV === "production" ? process.env.BASE_DATOS_DIALECTO_PROD : process.env.BASE_DATOS_DIALECTO_DEV,
  directory: '../models',
  additional: {
    timestamps: false, 
  },
  define: {
    timestamps: false 
  }
}

const sequelize = new Sequelize(
  process.env.NODE_ENV === "production" ? process.env.BASE_DATOS_NOMBRE_PROD : process.env.BASE_DATOS_NOMBRE_DEV,
  process.env.NODE_ENV === "production" ? process.env.BASE_DATOS_USUARIO_PROD : process.env.BASE_DATOS_USUARIO_DEV,
  process.env.NODE_ENV === "production" ? process.env.BASE_DATOS_CONTRASENA_PROD : process.env.BASE_DATOS_CONTRASENA_DEV,
  configuracion
);



module.exports = sequelize;