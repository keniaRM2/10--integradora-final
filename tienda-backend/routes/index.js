const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter');
const authRouter = require('./authRouter');
const categoriaRouter = require('./categoriaRouter');
const productoRouter = require('./productoRouter');

module.exports = [
    rolRouter, 
    usuarioRouter,
    authRouter,
    categoriaRouter,
    productoRouter
];