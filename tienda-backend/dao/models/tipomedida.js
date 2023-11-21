const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipomedida', {
    idTipoMedida: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "nombre"
    }
  }, {
    sequelize,
    tableName: 'tipomedida',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTipoMedida" },
        ]
      },
      {
        name: "nombre",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
    ]
  });
};
