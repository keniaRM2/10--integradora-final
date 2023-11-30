const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medida', {
    idMedida: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    medida: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    tipoMedidaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipomedida',
        key: 'idTipoMedida'
      }
    },
    tallaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'talla',
        key: 'idTalla'
      }
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
    tableName: 'medida',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMedida" },
        ]
      },
      {
        name: "fk_medida_tipoMedida1_idx",
        using: "BTREE",
        fields: [
          { name: "tipoMedidaId" },
        ]
      },
      {
        name: "fk_medida_talla1_idx",
        using: "BTREE",
        fields: [
          { name: "tallaId" },
        ]
      },
      {
        name: "fk_medida_producto1_idx",
        using: "BTREE",
        fields: [
          { name: "productoId" },
        ]
      },
    ]
  });
};
