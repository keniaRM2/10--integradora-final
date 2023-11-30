const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carrito_producto', {
    idCarritoProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      allowNull: false
    },
    carritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carrito',
        key: 'idCarrito'
      },
      unique: "fkCarritoCopy1Carrito1"
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
    tableName: 'carrito_producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCarritoProducto" },
        ]
      },
      {
        name: "carritoProductoUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "carritoId" },
        ]
      },
      {
        name: "fkCarritoCopy1Carrito1Idx",
        using: "BTREE",
        fields: [
          { name: "carritoId" },
        ]
      },
      {
        name: "fk_carrito_producto_stock1_idx",
        using: "BTREE",
        fields: [
          { name: "stockId" },
        ]
      },
    ]
  });
};
