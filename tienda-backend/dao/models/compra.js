const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compra', {
    idCompra: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaCompra: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    montoPagado: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'idPersona'
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'idStatus'
      }
    }
  }, {
    sequelize,
    tableName: 'compra',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCompra" },
        ]
      },
      {
        name: "fkCarritoPersona1Idx",
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
      {
        name: "fkCompraStatus1Idx",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
    ]
  });
};
