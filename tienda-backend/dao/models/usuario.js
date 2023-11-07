const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "usuarioUnique"
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue:new Date()
    },
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rol',
        key: 'idRol'
      }
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'idStatus'
      }
    },
    personaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'persona',
        key: 'idPersona'
      },
      unique: "fkUsuarioPersona1"
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "usuarioUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario" },
        ]
      },
      {
        name: "personaIdUnique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
      {
        name: "fkUsuarioRolIdx",
        using: "BTREE",
        fields: [
          { name: "rolId" },
        ]
      },
      {
        name: "fkUsuarioStatus1Idx",
        using: "BTREE",
        fields: [
          { name: "statusId" },
        ]
      },
      {
        name: "fkUsuarioPersona1Idx",
        using: "BTREE",
        fields: [
          { name: "personaId" },
        ]
      },
    ]
  });
};
