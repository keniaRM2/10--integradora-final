const conexion = require('../config/conexionBD');

var DataTypes = require("sequelize").DataTypes;
var _carrito = require("./carrito");
var _carrito_producto = require("./carrito_producto");
var _categoria = require("./categoria");
var _compra = require("./compra");
var _compra_producto = require("./compra_producto");
var _comprobante = require("./comprobante");
var _contacto = require("./contacto");
var _direccion = require("./direccion");
var _envio = require("./envio");
var _genero = require("./genero");
var _imagen = require("./imagen");
var _pago = require("./pago");
var _persona = require("./persona");
var _producto = require("./producto");
var _rol = require("./rol");
var _status = require("./status");
var _subcategoria = require("./subcategoria");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var carrito = _carrito(sequelize, DataTypes);
  var carrito_producto = _carrito_producto(sequelize, DataTypes);
  var categoria = _categoria(sequelize, DataTypes);
  var compra = _compra(sequelize, DataTypes);
  var compra_producto = _compra_producto(sequelize, DataTypes);
  var comprobante = _comprobante(sequelize, DataTypes);
  var contacto = _contacto(sequelize, DataTypes);
  var direccion = _direccion(sequelize, DataTypes);
  var envio = _envio(sequelize, DataTypes);
  var genero = _genero(sequelize, DataTypes);
  var imagen = _imagen(sequelize, DataTypes);
  var pago = _pago(sequelize, DataTypes);
  var persona = _persona(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var subcategoria = _subcategoria(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  carrito_producto.belongsTo(carrito, { as: "carrito", foreignKey: "carritoId"});
  carrito.hasMany(carrito_producto, { as: "carrito_productos", foreignKey: "carritoId"});
  subcategoria.belongsTo(categoria, { as: "categorium", foreignKey: "categoriaId"});
  categoria.hasMany(subcategoria, { as: "subcategoria", foreignKey: "categoriaId"});
  compra_producto.belongsTo(compra, { as: "compra", foreignKey: "compraId"});
  compra.hasMany(compra_producto, { as: "compra_productos", foreignKey: "compraId"});
  envio.belongsTo(compra, { as: "compra", foreignKey: "compraId"});
  compra.hasMany(envio, { as: "envios", foreignKey: "compraId"});
  pago.belongsTo(compra, { as: "compra", foreignKey: "compraId"});
  compra.hasMany(pago, { as: "pagos", foreignKey: "compraId"});
  persona.belongsTo(genero, { as: "genero", foreignKey: "generoId"});
  genero.hasMany(persona, { as: "personas", foreignKey: "generoId"});
  comprobante.belongsTo(pago, { as: "pago", foreignKey: "pagoId"});
  pago.hasOne(comprobante, { as: "comprobante", foreignKey: "pagoId"});
  carrito.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasOne(carrito, { as: "carrito", foreignKey: "personaId"});
  compra.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasMany(compra, { as: "compras", foreignKey: "personaId"});
  contacto.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasOne(contacto, { as: "contacto", foreignKey: "personaId"});
  direccion.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasOne(direccion, { as: "direccion", foreignKey: "personaId"});
  envio.belongsTo(persona, { as: "personaResponsable", foreignKey: "personaResponsableId"});
  persona.hasMany(envio, { as: "envios", foreignKey: "personaResponsableId"});
  pago.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasMany(pago, { as: "pagos", foreignKey: "personaId"});
  usuario.belongsTo(persona, { as: "persona", foreignKey: "personaId"});
  persona.hasOne(usuario, { as: "usuario", foreignKey: "personaId"});
  carrito_producto.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(carrito_producto, { as: "carrito_productos", foreignKey: "productoId"});
  compra_producto.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(compra_producto, { as: "compra_productos", foreignKey: "productoId"});
  imagen.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(imagen, { as: "imagens", foreignKey: "productoId"});
  usuario.belongsTo(rol, { as: "rol", foreignKey: "rolId"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rolId"});
  categoria.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(categoria, { as: "categoria", foreignKey: "statusId"});
  compra.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(compra, { as: "compras", foreignKey: "statusId"});
  producto.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(producto, { as: "productos", foreignKey: "statusId"});
  usuario.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(usuario, { as: "usuarios", foreignKey: "statusId"});
  producto.belongsTo(subcategoria, { as: "subcategorium", foreignKey: "subcategoriaId"});
  subcategoria.hasMany(producto, { as: "productos", foreignKey: "subcategoriaId"});

  return {
    carrito,
    carrito_producto,
    categoria,
    compra,
    compra_producto,
    comprobante,
    contacto,
    direccion,
    envio,
    genero,
    imagen,
    pago,
    persona,
    producto,
    rol,
    status,
    subcategoria,
    usuario,
  };
}

const models = initModels(conexion)

module.exports = models;
module.exports.initModels = models;
module.exports.default = models;
