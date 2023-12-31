const jwt = require('jsonwebtoken');
const utileria = require("./utileria");

function verificarToken(req, res, next) {
    let token = req.header('Authorization');
    if(req.path.includes('/auth/') || req.path.includes('api/stock')){
        next();
    }else{
        if (!token) {
            return utileria.reponseError("Acceso denegado. Token no proporcionado.", res, 401);
        }
    
        try {

            token = token.replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.CLAVE_TOKEN); 
            req.body['usuarioSesion'] = decoded;
            next();
        } catch (error) {
            return utileria.reponseError("Acceso invalido", res, 401);
        }
    }
    
}

module.exports = verificarToken;