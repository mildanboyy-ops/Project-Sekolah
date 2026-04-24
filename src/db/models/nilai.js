'use strict';

module.exports = (sequelize, DataTypes) => {

  const Nilai = sequelize.define('Nilai', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },

    siswaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    guruId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    mapelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // 🔥 FIX FINAL (konsisten INTEGER semua)
    tugasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    nilai: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    jenis: {
      type: DataTypes.ENUM("harian", "tugas", "uts", "uas"),
      defaultValue: "harian"
    },

    tanggal: DataTypes.DATEONLY,

    bobot: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },

    semester: {
      type: DataTypes.ENUM("ganjil", "genap")
    },

    tahunAjaran: DataTypes.STRING,

    catatan: DataTypes.TEXT

  }, {
    tableName: 'Nilai',
    timestamps: true
  });

  Nilai.associate = function(models) {

    Nilai.belongsTo(models.Siswa, {
      foreignKey: 'siswaId',
      as: 'siswa'
    });

    Nilai.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    Nilai.belongsTo(models.Mapel, {
      foreignKey: 'mapelId',
      as: 'mapel'
    });

    Nilai.belongsTo(models.Tugas, {
      foreignKey: 'tugasId',
      as: 'tugas'
    });

  };

  return Nilai;
};