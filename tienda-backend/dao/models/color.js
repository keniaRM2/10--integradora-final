const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('color', {
    idColor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    color: {
      type: DataTypes.STRING(45),
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
    tableName: 'color',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idColor" },
        ]
      },
      {
        name: "fk_colorProducto_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "productoId" },
        ]
      },
    ]
  });
};
