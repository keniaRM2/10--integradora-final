const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carrito', {
    idCarrito: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaActualizacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'idPersona'
      },
      unique: "fkCarritoPersona1"
    }
  }, {
    sequelize,
    tableName: 'carrito',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarrito" },
        ]
      },
      {
        name: "personaId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
      {
        name: "fkCarritoPersona1Idx",
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
    ]
  });
};
