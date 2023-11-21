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
      allowNull: true,
      references: {
        model: 'producto',
        key: 'idProducto'
      }
    },
    subcategoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subcategoria',
        key: 'idSubcategoria'
      }
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categoria',
        key: 'idCategoria'
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
      {
        name: "fk_imagen_subcategoria1_idx",
        using: "BTREE",
        fields: [
          { name: "subcategoriaId" },
        ]
      },
      {
        name: "fk_imagen_categoria1_idx",
        using: "BTREE",
        fields: [
          { name: "categoriaId" },
        ]
      },
    ]
  });
};
