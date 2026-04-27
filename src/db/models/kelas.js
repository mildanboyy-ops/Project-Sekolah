'use strict';

module.exports = (sequelize, DataTypes) => {

  const Kelas = sequelize.define('Kelas', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    tingkat: {
      type: DataTypes.ENUM("X", "XI", "XII"),
      allowNull: false
    },

    jurusan: {
      type: DataTypes.STRING,
      allowNull: false
    },

    kapasitas: {
      type: DataTypes.INTEGER,
      defaultValue: 30
    },

    jumlahSiswa: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    status: {
      type: DataTypes.ENUM("aktif", "nonaktif"),
      defaultValue: "aktif"
    },

    waliKelasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  }, {
    tableName: 'Kelas',
    timestamps: true
  });

  Kelas.associate = function(models) {

    // 🔥 SISWA
    Kelas.hasMany(models.Siswa, {
      foreignKey: 'kelasId',
      as: 'siswa'
    });

    // 🔥 JADWAL
    Kelas.hasMany(models.Jadwal, {
      foreignKey: 'kelasId',
      as: 'jadwal'
    });

    // 🔥 NILAI (PENTING BIAR INCLUDE GAK ERROR)
    Kelas.hasMany(models.Nilai, {
      foreignKey: 'kelasId',
      as: 'nilai'
    });

    // 🔥 TUGAS
    Kelas.hasMany(models.Tugas, {
      foreignKey: 'kelasId',
      as: 'tugas'
    });

    // 🔥 WALI KELAS
    Kelas.belongsTo(models.Guru, {
      foreignKey: 'waliKelasId',
      as: 'waliKelas'
    });

    // 🔥 PENGUMUMAN (OPTIONAL FILTER)
    Kelas.hasMany(models.Pengumuman, {
      foreignKey: 'kelasId',
      as: 'pengumuman'
    });

  };

  return Kelas;
};