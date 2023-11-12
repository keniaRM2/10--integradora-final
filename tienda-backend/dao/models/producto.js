const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producto', {
    idProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "clave_UNIQUE"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "usuario_UNIQUE"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    existencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'idStatus'
      }
    },
    subcategoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subcategoria',
        key: 'idSubcategoria'
      }
    }
  }, {
    sequelize,
    tableName: 'producto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProducto" },
        ]
      },
      {
        name: "usuario_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
      {
        name: "clave_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clave" },
        ]
      },
      {
        name: "fkProductoStatus1Idx",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
      {
        name: "fkProductoSubcategoria1Idx",
        using: "BTREE",
        fields: [
          { name: "subcategoriaId" },
        ]
      },
    ]
  });
};
