const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direccion', {
    idDireccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numeroInterior: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    numeroExterior: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    calle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    colonia: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    entidadFederativa: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'idPersona'
      },
      unique: "fkDireccionPersona1"
    }
  }, {
    sequelize,
    tableName: 'direccion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDireccion" },
        ]
      },
      {
        name: "personaId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
    ]
  });
};
