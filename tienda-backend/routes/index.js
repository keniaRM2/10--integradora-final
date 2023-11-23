const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter');
const authRouter = require('./authRouter');
const categoriaRouter = require('./categoriaRouter');
const productoRouter = require('./productoRouter');
const subCategoriaRouter = require('./subCategoriaRouter');
const stockRouter = require('./stockRouter');
const tallaRouter = require('./tallaRouter');
const tipoMedidaRouter = require('./tipoMedidaRouter');
const pagoRouter = require('./pagoRouter');

module.exports = [
    rolRouter, 
    usuarioRouter,
    authRouter,
    categoriaRouter,
    productoRouter,
    subCategoriaRouter,
    stockRouter,
    tallaRouter,
    tipoMedidaRouter,
    pagoRouter
];