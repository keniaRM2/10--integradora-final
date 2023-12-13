const conexion = require('../config/conexionBD');

let DataTypes = require("sequelize").DataTypes;
let _carrito = require("./carrito");
let _carrito_producto = require("./carrito_producto");
let _categoria = require("./categoria");
let _color = require("./color");
let _compra = require("./compra");
let _compra_producto = require("./compra_producto");
let _comprobante = require("./comprobante");
let _contacto = require("./contacto");
let _direccion = require("./direccion");
let _envio = require("./envio");
let _genero = require("./genero");
let _imagen = require("./imagen");
let _medida = require("./medida");
let _pago = require("./pago");
let _persona = require("./persona");
let _producto = require("./producto");
let _rol = require("./rol");
let _status = require("./status");
let _stock = require("./stock");
let _subcategoria = require("./subcategoria");
let _talla = require("./talla");
let _tipomedida = require("./tipomedida");
let _usuario = require("./usuario");

function initModels(sequelize) {
  let carrito = _carrito(sequelize, DataTypes);
  let carrito_producto = _carrito_producto(sequelize, DataTypes);
  let categoria = _categoria(sequelize, DataTypes);
  let color = _color(sequelize, DataTypes);
  let compra = _compra(sequelize, DataTypes);
  let compra_producto = _compra_producto(sequelize, DataTypes);
  let comprobante = _comprobante(sequelize, DataTypes);
  let contacto = _contacto(sequelize, DataTypes);
  let direccion = _direccion(sequelize, DataTypes);
  let envio = _envio(sequelize, DataTypes);
  let genero = _genero(sequelize, DataTypes);
  let imagen = _imagen(sequelize, DataTypes);
  let medida = _medida(sequelize, DataTypes);
  let pago = _pago(sequelize, DataTypes);
  let persona = _persona(sequelize, DataTypes);
  let producto = _producto(sequelize, DataTypes);
  let rol = _rol(sequelize, DataTypes);
  let status = _status(sequelize, DataTypes);
  let stock = _stock(sequelize, DataTypes);
  let subcategoria = _subcategoria(sequelize, DataTypes);
  let talla = _talla(sequelize, DataTypes);
  let tipomedida = _tipomedida(sequelize, DataTypes);
  let usuario = _usuario(sequelize, DataTypes);

  carrito_producto.belongsTo(carrito, { as: "carrito", foreignKey: "carritoId"});
  carrito.hasOne(carrito_producto, { as: "carrito_producto", foreignKey: "carritoId"});
  imagen.belongsTo(categoria, { as: "categoria", foreignKey: "categoriaId"});
  categoria.hasMany(imagen, { as: "imagenes", foreignKey: "categoriaId"});
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
  producto.hasMany(imagen, { as: "imagenes", foreignKey: "productoId"});
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
  subcategoria.hasMany(imagen, { as: "imagenes", foreignKey: "subcategoriaId"});
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
