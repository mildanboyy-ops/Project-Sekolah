'use strict';

module.exports = (sequelize, DataTypes) => {

  const Admin = sequelize.define('Admin', {

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
      type: DataTypes.ENUM("super_admin", "admin"),
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
    refreshToken: DataTypes.TEXT,

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Admin',
    timestamps: true
  });

  Admin.associate = function(models) {

    Admin.hasMany(models.Kelas, {
      foreignKey: 'waliKelasId',
      as: 'kelasWali'
    });

    // 🔥 FIX: disamakan dengan Pengumuman terbaru
    Admin.hasMany(models.Pengumuman, {
      foreignKey: 'createdById',
      as: 'pengumuman'
    });

  };

  return Admin;
};