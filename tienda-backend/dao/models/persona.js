const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('persona', {
    idPersona: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    primerApellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    segundoApellido: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    generoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genero',
        key: 'idGenero'
      }
    }
  }, {
    sequelize,
    tableName: 'persona',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPersona" },
        ]
      },
      {
        name: "fkPersonaGenero1Idx",
        using: "BTREE",
        fields: [
          { name: "generoId" },
        ]
      },
    ]
  });
};
