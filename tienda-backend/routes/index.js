const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter');
const authRouter = require('./authRouter');
const categoriaRouter = require('./categoriaRouter');
const productoRouter = require('./productoRouter');
const carritoRouter = require('./carritoRouter');
const subCategoriaRouter = require('./subCategoriaRouter');
const stockRouter = require('./stockRouter');
const tallaRouter = require('./tallaRouter');
const tipoMedidaRouter = require('./tipoMedidaRouter');
const pagoRouter = require('./pagoRouter');
const compraRouter = require('./compraRouter');
const envioRouter = require('./envioRouter');
const generoRouter = require('./generoRouter');

module.exports = [
    rolRouter, 
    usuarioRouter,
    authRouter,
    categoriaRouter,
    productoRouter,
    carritoRouter,
    subCategoriaRouter,
    stockRouter,
    tallaRouter,
    tipoMedidaRouter,
    pagoRouter,
    compraRouter,
    envioRouter,
    generoRouter
];