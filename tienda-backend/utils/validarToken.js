const jwt = require('jsonwebtoken');
const utileria = require("./utileria");

function verificarToken(req, res, next) {
    let token = req.header('Authorization');
    console.log("token", token);
    if(req.path.includes('/auth/')){
        next();
    }else{
        if (!token) {
            return utileria.reponseError("Acceso denegado. Token no proporcionado.", res, 401);
        }
    
        try {

            token = token.replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.CLAVE_TOKEN); 
            req.usuario = decoded;
            next();
        } catch (error) {
            return utileria.reponseError("Acceso invalido", res, 401);
        }
    }
    
}

module.exports = verificarToken;