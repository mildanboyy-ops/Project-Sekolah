'use strict';

module.exports = (sequelize, DataTypes) => {

  const Pengumuman = sequelize.define('Pengumuman', {

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

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    priority: {
      type: DataTypes.ENUM("low", "normal", "high", "urgent"),
      defaultValue: "normal"
    },

    target: {
      type: DataTypes.ENUM("all", "guru", "siswa", "admin"),
      defaultValue: "all"
    },

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    publishAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    expiredAt: DataTypes.DATE,

    // 🔥 CREATOR
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    createdByType: {
      type: DataTypes.ENUM("guru", "admin"),
      allowNull: false
    },

    // 🔥 UPDATER (FIX MISSING)
    updatedById: {
      type: DataTypes.INTEGER
    },

    updatedByType: {
      type: DataTypes.ENUM("guru", "admin")
    },

    status: {
      type: DataTypes.ENUM("draft","published","archived"),
      defaultValue: "published"
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Pengumuman',
    timestamps: true
  });

 Pengumuman.associate = function(models) {

  // 🔥 KELAS
  Pengumuman.belongsTo(models.Kelas, {
    foreignKey: 'kelasId',
    as: 'kelas'
  });

  // 🔥 CREATOR GURU
  Pengumuman.belongsTo(models.Guru, {
    foreignKey: 'createdById',
    constraints: false,
    as: 'creatorGuru'
  });

  // 🔥 CREATOR ADMIN
  Pengumuman.belongsTo(models.Admin, {
    foreignKey: 'createdById',
    constraints: false,
    as: 'creatorAdmin'
  });

};

  return Pengumuman;
};