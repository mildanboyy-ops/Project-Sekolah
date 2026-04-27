'use strict';

module.exports = (sequelize, DataTypes) => {

  const Admin = sequelize.define('Admin', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },

    role: {
      type: DataTypes.ENUM("super_admin", "admin"),
      allowNull: false,
      defaultValue: "admin"
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

    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM("active", "suspended"),
      defaultValue: "active"
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    loginAttempt: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    lockedUntil: DataTypes.DATE,

    deletedAt: DataTypes.DATE

  }, {
    tableName: 'Admin',
    timestamps: true,
    paranoid: true // soft delete (sesuai migration kamu)
  });

  Admin.associate = function (models) {

    Admin.hasMany(models.Pengumuman, {
      foreignKey: 'createdById',
      constraints: false,
      scope: {
        createdByType: 'admin'
      },
      as: 'pengumuman'
    });

  };

  return Admin;
};