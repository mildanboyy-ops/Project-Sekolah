'use strict';

module.exports = (sequelize, DataTypes) => {

  const Absensi = sequelize.define('Absensi', {

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

    siswaId: DataTypes.INTEGER,
    jadwalId: DataTypes.UUID,

    // 🔥 FIX: sinkron dengan migration
    guruId: DataTypes.INTEGER,
    mapelId: DataTypes.INTEGER,

    status: {
      type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'alpha'),
      allowNull: false
    },

    tanggal: DataTypes.DATEONLY,

    jamMasuk: DataTypes.TIME,
    jamKeluar: DataTypes.TIME,

    keterangan: DataTypes.TEXT,

    metode: {
      type: DataTypes.ENUM("manual", "qr", "gps"),
      defaultValue: "manual"
    },

    divalidasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    tableName: 'Absensi',
    timestamps: true
  });

  Absensi.associate = function(models) {

    Absensi.belongsTo(models.Siswa, {
      foreignKey: 'siswaId',
      as: 'siswa'
    });

    Absensi.belongsTo(models.Jadwal, {
      foreignKey: 'jadwalId',
      as: 'jadwal'
    });

    Absensi.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    Absensi.belongsTo(models.Mapel, {
      foreignKey: 'mapelId',
      as: 'mapel'
    });

  };

  return Absensi;
};