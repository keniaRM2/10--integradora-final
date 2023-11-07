const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categoria', {
    idCategoria: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "usuarioUnique"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'categoria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCategoria" },
        ]
      },
      {
        name: "usuarioUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre" },
        ]
      },
      {
        name: "fkCategoriaStatus1Idx",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
    ]
  });
};
