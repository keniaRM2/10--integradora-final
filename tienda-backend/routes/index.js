const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter');
const authRouter = require('./authRouter');
const categoriaRouter = require('./categoriaRouter');
const productoRouter = require('./productoRouter');
const subCategoriaRouter = require('./subCategoriaRouter');

module.exports = [
    rolRouter, 
    usuarioRouter,
    authRouter,
    categoriaRouter,
    productoRouter,
    subCategoriaRouter
];