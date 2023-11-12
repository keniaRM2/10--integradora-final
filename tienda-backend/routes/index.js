const rolRouter = require('./rolRouter');
const usuarioRouter = require('./usuarioRouter');
const authRouter = require('./authRouter');
const categoriaRouter = require('./categoriaRouter');

module.exports = [
    rolRouter, 
    usuarioRouter,
    authRouter,
    categoriaRouter
];