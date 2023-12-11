import React from 'react';
import Yup from '../config/i18nYup';
import Crud from '../components/crud';
import servicio from "../services/TipoMedidaService.js";
import formulario from "../components/tipoMedida/Formulario";
import RouteConstant from './routeConstant';

// TITULO DE CRUD
const cabecera = {
  titulo: "Tipos de medidas",
  descripcion: "Administración de registros, listar, registrar, actualizar, eliminar.",
  icono: "pe-7s-graph3"
};

// COLUMNAS DE TABLA
const columnas = [
  {
    name: 'NO.',
    center: true,
    selector: row => row.indice,

  },
  {
    name: 'NOMBRE',
    center: true,
    selector: row => row.nombre,

  },
  {
    name: 'ACCIONES',
    center: true,
    selector: row => row.acciones,

  }
];

// VALOR INICIAL DEL OBJETO DEL FORMULARIO
const inicial = {
  nombre: ''
};

// VALIDACIONES POR CADA ATRIBUTO DEL FORMULARIO
let validaciones = Yup.object().shape({
  nombre: Yup.string().min(1).max(50).required(),
});

const ruta = {
  path: RouteConstant.TIPO_MEDIDA,
  component: () => (
    <Crud
      columnas={columnas}
      cabecera={cabecera}
      inicial={inicial}
      servicio={servicio}
      Formulario={formulario}
      validaciones={validaciones}
    />
  )
};

export default ruta;
