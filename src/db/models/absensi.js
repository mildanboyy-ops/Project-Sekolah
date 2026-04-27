'use strict';

module.exports = (sequelize, DataTypes) => {

  const Absensi = sequelize.define('Absensi', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

    status: {
      type: DataTypes.ENUM('hadir', 'izin', 'sakit', 'alpha'),
      allowNull: false
    },

    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },

    jamMasuk: DataTypes.TIME,
    jamKeluar: DataTypes.TIME,
    keterangan: DataTypes.TEXT,

    metode: {
      type: DataTypes.ENUM('manual', 'qr', 'gps'),
      defaultValue: 'manual'
    },

    divalidasi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    tableName: 'Absensi',
    timestamps: true
  });

  Absensi.associate = (models) => {

    Absensi.belongsTo(models.Siswa, {
      foreignKey: 'siswaId',
      as: 'siswa'
    });

  };

  return Absensi;
};