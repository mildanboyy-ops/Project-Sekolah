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

    jurusan: DataTypes.STRING,

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

    Kelas.hasMany(models.Siswa, {
      foreignKey: 'kelasId',
      as: 'siswa'
    });

    Kelas.hasMany(models.Guru, {
      foreignKey: 'kelasId',
      as: 'guru'
    });

    Kelas.hasMany(models.Jadwal, {
      foreignKey: 'kelasId',
      as: 'jadwal'
    });

    Kelas.belongsTo(models.Admin, {
      foreignKey: 'waliKelasId',
      as: 'waliKelas'
    });

  };

  return Kelas;
};