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
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'idProducto'
      }
    },
    carritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carrito',
        key: 'idCarrito'
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
          { name: "productoId" },
        ]
      },
      {
        name: "fkCarritoCopy1Producto1Idx",
        using: "BTREE",
        fields: [
          { name: "productoId" },
        ]
      },
      {
        name: "fkCarritoCopy1Carrito1Idx",
        using: "BTREE",
        fields: [
          { name: "carritoId" },
        ]
      },
    ]
  });
};
