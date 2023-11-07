const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contacto', {
    idContacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    correoElectronico: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefonoPrincipal: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    telefonoSecundario: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'idPersona'
      },
      unique: "fkContactoPersona1"
    }
  }, {
    sequelize,
    tableName: 'contacto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idContacto" },
        ]
      },
      {
        name: "personaIdPersonaUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
      {
        name: "fkContactoPersona1Idx",
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
    ]
  });
};
