'use strict';

module.exports = (sequelize, DataTypes) => {

  const Guru = sequelize.define('Guru', {

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

    nip: {
      type: DataTypes.STRING,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: DataTypes.STRING,

    address: DataTypes.TEXT,

    gender: DataTypes.ENUM("L", "P"),

    birthDate: DataTypes.DATEONLY,

    isWaliKelas: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    status: {
      type: DataTypes.ENUM('aktif', 'nonaktif', 'guru'),
      defaultValue: 'guru'
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Guru',
    timestamps: true
  });

  Guru.associate = function(models) {

    // 🔥 MAPEL RELATION (BIAR INCLUDE MAPEL JUGA VALID)
    Guru.belongsToMany(models.Mapel, {
      through: 'GuruMapel',
      foreignKey: 'guruId',
      otherKey: 'mapelId',
      as: 'mapel'
    });

    // 🔥 JADWAL
    Guru.hasMany(models.Jadwal, {
      foreignKey: 'guruId',
      as: 'jadwal'
    });

    // 🔥 NILAI
    Guru.hasMany(models.Nilai, {
      foreignKey: 'guruId',
      as: 'nilai'
    });

    // 🔥 TUGAS
    Guru.hasMany(models.Tugas, {
      foreignKey: 'guruId',
      as: 'tugas'
    });

    // 🔥 WALI KELAS
    Guru.hasOne(models.Kelas, {
      foreignKey: 'waliKelasId',
      as: 'kelasWali'
    });

    // 🔥 PENGUMUMAN
    Guru.hasMany(models.Pengumuman, {
      foreignKey: 'createdById',
      constraints: false,
      scope: {
        createdByType: 'guru'
      },
      as: 'pengumuman'
    });

  };

  return Guru;
};