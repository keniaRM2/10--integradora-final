const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pago', {
    idPago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: false
    },
    monto: {
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
    compraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compra',
        key: 'idCompra'
      }
    }
  }, {
    sequelize,
    tableName: 'pago',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPago" },
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
        name: "fkPagoCompra1Idx",
        using: "BTREE",
        fields: [
          { name: "compraId" },
        ]
      },
    ]
  });
};
