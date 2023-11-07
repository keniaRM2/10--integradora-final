require('dotenv').config();

const {
  Sequelize
} = require('sequelize');


const configuracion = {
  host:  process.env.BASE_DATOS_HOST,
  dialect:  process.env.BASE_DATOS_DIALECTO,
  directory: '../models',
  additional: {
    timestamps: false, 
  },
  define: {
    timestamps: false 
  }
}

const sequelize = new Sequelize(
  process.env.BASE_DATOS_NOMBRE,
  process.env.BASE_DATOS_USUARIO,
  process.env.BASE_DATOS_CONTRASENA,
  configuracion
);



module.exports = sequelize;