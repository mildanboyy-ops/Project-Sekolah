'use strict';

module.exports = (sequelize, DataTypes) => {

  const SuperAdmin = sequelize.define('SuperAdmin', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },

    role: {
      type: DataTypes.ENUM("super_admin"),
      defaultValue: "super_admin"
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    avatar: DataTypes.STRING,

    lastLogin: DataTypes.DATE,
    refreshToken: DataTypes.TEXT,

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'SuperAdmin',
    timestamps: true
  });

  SuperAdmin.associate = function(models) {
    // no relations (clean design)
  };

  return SuperAdmin;
};