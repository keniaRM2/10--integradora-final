const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comprobante', {
    idComprobante: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    formato: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    imagen: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    pagoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pago',
        key: 'idPago'
      },
      unique: "fkComprobantePago1"
    }
  }, {
    sequelize,
    tableName: 'comprobante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idComprobante" },
        ]
      },
      {
        name: "comprobanteCompraUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pagoId" },
        ]
      },
      {
        name: "fkComprobantePago1Idx",
        using: "BTREE",
        fields: [
          { name: "pagoId" },
        ]
      },
    ]
  });
};
