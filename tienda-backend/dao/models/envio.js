const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('envio', {
    idEnvio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    compraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compra',
        key: 'idCompra'
      }
    },
    personaResponsableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'idPersona'
      }
    }
  }, {
    sequelize,
    tableName: 'envio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEnvio" },
        ]
      },
      {
        name: "fkEnvioCompra1Idx",
        using: "BTREE",
        fields: [
          { name: "compraId" },
        ]
      },
      {
        name: "fkEnvioPersona1Idx",
        using: "BTREE",
        fields: [
          { name: "personaResponsableId" },
        ]
      },
    ]
  });
};
