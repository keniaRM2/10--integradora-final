const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stock', {
    idStock: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    existencia: {
      type: DataTypes.INTEGER,
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
    tallaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'talla',
        key: 'idTalla'
      }
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'color',
        key: 'idColor'
      }
    }
  }, {
    sequelize,
    tableName: 'stock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idStock" },
        ]
      },
      {
        name: "fk_existencia_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "productoId" },
        ]
      },
      {
        name: "fk_existencia_talla1_idx",
        using: "BTREE",
        fields: [
          { name: "tallaId" },
        ]
      },
      {
        name: "fk_existencia_color1_idx",
        using: "BTREE",
        fields: [
          { name: "colorId" },
        ]
      },
    ]
  });
};
