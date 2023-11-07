const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subcategoria', {
    idSubcategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categoria',
        key: 'idCategoria'
      }
    }
  }, {
    sequelize,
    tableName: 'subcategoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idSubcategoria" },
        ]
      },
      {
        name: "subcategoriaUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
          { name: "categoriaId" },
        ]
      },
      {
        name: "fkSubcategoriaCategoria1Idx",
        using: "BTREE",
        fields: [
          { name: "categoriaId" },
        ]
      },
    ]
  });
};
