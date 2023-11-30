const conexion = require('../config/conexionBD');

var DataTypes = require("sequelize").DataTypes;
var _carrito = require("./carrito");
var _carrito_producto = require("./carrito_producto");
var _categoria = require("./categoria");
var _color = require("./color");
var _compra = require("./compra");
var _compra_producto = require("./compra_producto");
var _comprobante = require("./comprobante");
var _contacto = require("./contacto");
var _direccion = require("./direccion");
var _envio = require("./envio");
var _genero = require("./genero");
var _imagen = require("./imagen");
var _medida = require("./medida");
var _pago = require("./pago");
var _persona = require("./persona");
var _producto = require("./producto");
var _rol = require("./rol");
var _status = require("./status");
var _stock = require("./stock");
var _subcategoria = require("./subcategoria");
var _talla = require("./talla");
var _tipomedida = require("./tipomedida");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var carrito = _carrito(sequelize, DataTypes);
  var carrito_producto = _carrito_producto(sequelize, DataTypes);
  var categoria = _categoria(sequelize, DataTypes);
  var color = _color(sequelize, DataTypes);
  var compra = _compra(sequelize, DataTypes);
  var compra_producto = _compra_producto(sequelize, DataTypes);
  var comprobante = _comprobante(sequelize, DataTypes);
  var contacto = _contacto(sequelize, DataTypes);
  var direccion = _direccion(sequelize, DataTypes);
  var envio = _envio(sequelize, DataTypes);
  var genero = _genero(sequelize, DataTypes);
  var imagen = _imagen(sequelize, DataTypes);
  var medida = _medida(sequelize, DataTypes);
  var pago = _pago(sequelize, DataTypes);
  var persona = _persona(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);
  var stock = _stock(sequelize, DataTypes);
  var subcategoria = _subcategoria(sequelize, DataTypes);
  var talla = _talla(sequelize, DataTypes);
  var tipomedida = _tipomedida(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  carrito_producto.belongsTo(carrito, { as: "carrito", foreignKey: "carritoId"});
  carrito.hasOne(carrito_producto, { as: "carrito_producto", foreignKey: "carritoId"});
  imagen.belongsTo(categoria, { as: "categoria", foreignKey: "categoriaId"});
  categoria.hasMany(imagen, { as: "imagens", foreignKey: "categoriaId"});
  subcategoria.belongsTo(categoria, { as: "categoria", foreignKey: "categoriaId"});
  categoria.hasMany(subcategoria, { as: "subcategoria", foreignKey: "categoriaId"});
  stock.belongsTo(color, { as: "color", foreignKey: "colorId"});
  color.hasMany(stock, { as: "stocks", foreignKey: "colorId"});
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
  color.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(color, { as: "colores", foreignKey: "productoId"});
  imagen.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(imagen, { as: "imagens", foreignKey: "productoId"});
  medida.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(medida, { as: "medidas", foreignKey: "productoId"});
  stock.belongsTo(producto, { as: "producto", foreignKey: "productoId"});
  producto.hasMany(stock, { as: "stocks", foreignKey: "productoId"});
  usuario.belongsTo(rol, { as: "rol", foreignKey: "rolId"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rolId"});
  categoria.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(categoria, { as: "categoria", foreignKey: "statusId"});
  compra.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(compra, { as: "compras", foreignKey: "statusId"});
  envio.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(envio, { as: "envios", foreignKey: "statusId"});
  producto.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(producto, { as: "productos", foreignKey: "statusId"});
  usuario.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(usuario, { as: "usuarios", foreignKey: "statusId"});
  carrito_producto.belongsTo(stock, { as: "stock", foreignKey: "stockId"});
  stock.hasMany(carrito_producto, { as: "carrito_productos", foreignKey: "stockId"});
  compra_producto.belongsTo(stock, { as: "stock", foreignKey: "stockId"});
  stock.hasMany(compra_producto, { as: "compra_productos", foreignKey: "stockId"});
  imagen.belongsTo(subcategoria, { as: "subcategoria", foreignKey: "subcategoriaId"});
  subcategoria.hasMany(imagen, { as: "imagens", foreignKey: "subcategoriaId"});
  producto.belongsTo(subcategoria, { as: "subcategoria", foreignKey: "subcategoriaId"});
  subcategoria.hasMany(producto, { as: "productos", foreignKey: "subcategoriaId"});
  medida.belongsTo(talla, { as: "talla", foreignKey: "tallaId"});
  talla.hasMany(medida, { as: "medidas", foreignKey: "tallaId"});
  stock.belongsTo(talla, { as: "talla", foreignKey: "tallaId"});
  talla.hasMany(stock, { as: "stocks", foreignKey: "tallaId"});
  medida.belongsTo(tipomedida, { as: "tipoMedida", foreignKey: "tipoMedidaId"});
  tipomedida.hasMany(medida, { as: "medidas", foreignKey: "tipoMedidaId"});

  return {
    carrito,
    carrito_producto,
    categoria,
    color,
    compra,
    compra_producto,
    comprobante,
    contacto,
    direccion,
    envio,
    genero,
    imagen,
    medida,
    pago,
    persona,
    producto,
    rol,
    status,
    stock,
    subcategoria,
    talla,
    tipomedida,
    usuario,
  };
}


const models = initModels(conexion)

module.exports = models;
module.exports.initModels = models;
module.exports.default = models;
