const rolDAO = require('../dao/rolDAO');
const utileria = require('../utils/utileria.js')

exports.listarRoles = async (req, res) => {
  try {

    const roles =  await rolDAO.listarRoles();
    return utileria.responseOk(roles, res);

  } catch (error) {
    return utileria.reponseError(error, res);
  }
};
