const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('imagen', {
    idImagen: {
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
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'producto',
        key: 'idProducto'
      }
    }
  }, {
    sequelize,
    tableName: 'imagen',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idImagen" },
        ]
      },
      {
        name: "fkImagenProducto1Idx",
        using: "BTREE",
        fields: [
          { name: "productoId" },
        ]
      },
    ]
  });
};
