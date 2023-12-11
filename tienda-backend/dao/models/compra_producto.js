const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compra_producto', {
    idCompraProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    compraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'compra',
        key: 'idCompra'
      }
    },
    stockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stock',
        key: 'idStock'
      }
    }
  }, {
    sequelize,
    tableName: 'compra_producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCompraProducto" },
        ]
      },
      {
        name: "fkCompraProductoCompra1Idx",
        using: "BTREE",
        fields: [
          { name: "compraId" },
        ]
      },
      {
        name: "fk_compra_producto_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stockId" },
        ]
      },
    ]
  });
};
