'use strict';

module.exports = (sequelize, DataTypes) => {

  const Pengumuman = sequelize.define('Pengumuman', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
      type: DataTypes.ENUM("low","normal","high","urgent"),
      defaultValue: "normal"
    },

    target: {
      type: DataTypes.ENUM("all","guru","siswa","admin"),
      defaultValue: "all"
    },

    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    publishAt: DataTypes.DATE,
    expiredAt: DataTypes.DATE,

    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    createdByType: {
      type: DataTypes.ENUM("guru","admin"),
      allowNull: false
    },

    updatedById: DataTypes.INTEGER,
    updatedByType: DataTypes.ENUM("guru","admin")

  }, {
    tableName: 'Pengumuman',
    timestamps: true
  });

  Pengumuman.associate = function(models) {

    // 🔥 CLEAN: tidak double FK lagi

    Pengumuman.belongsTo(models.Guru, {
      foreignKey: 'createdById',
      constraints: false,
      as: 'guru'
    });

    Pengumuman.belongsTo(models.Admin, {
      foreignKey: 'createdById',
      constraints: false,
      as: 'admin'
    });

  };

  return Pengumuman;
};