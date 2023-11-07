const SequelizeAuto = require('sequelize-auto');
const path = require('path');
require('dotenv').config();

const configuracion = {
  host:  process.env.BASE_DATOS_HOST,
  dialect:  process.env.BASE_DATOS_DIALECTO,
  directory: path.resolve(__dirname, '../dao/models'), // Directorio donde se guardarán los modelos
  additional: {
    timestamps: false, 
  },
  define: {
    timestamps: false 
  }
}

const sequelize = new SequelizeAuto(
  process.env.BASE_DATOS_NOMBRE,
  process.env.BASE_DATOS_USUARIO,
  process.env.BASE_DATOS_CONTRASENA,
  configuracion
);

sequelize.run((err) => {
  if (err) throw err;
  console.log('Modelos generados exitosamente');
});
