'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Tugas extends Model {

    static associate(models) {

      Tugas.belongsTo(models.Guru, {
        foreignKey: 'guruId',
        as: 'guru'
      });

      Tugas.belongsTo(models.Mapel, {
        foreignKey: 'mapelId',
        as: 'mapel'
      });

      Tugas.hasMany(models.Nilai, {
        foreignKey: 'tugasId',
        as: 'nilai'
      });

    }

  }

  Tugas.init({

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

    guruId: DataTypes.INTEGER,
    mapelId: DataTypes.INTEGER,

    namaUjian: {
      type: DataTypes.STRING,
      allowNull: false
    },

    deskripsi: DataTypes.TEXT,
    file: DataTypes.STRING,

    tipe: {
      type: DataTypes.ENUM('GURU', 'MURID'),
      defaultValue: 'GURU'
    },

    hari: DataTypes.STRING,
    tanggal: DataTypes.INTEGER,
    bulan: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    jamUpload: DataTypes.STRING,

    deadlineTanggal: DataTypes.INTEGER,
    deadlineBulan: DataTypes.INTEGER,
    deadlineTahun: DataTypes.INTEGER,
    deadlineJam: DataTypes.STRING,

    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "published"
    },

    bobot: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },

    toleransiMenit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    link: DataTypes.STRING,

    modePengumpulan: {
      type: DataTypes.ENUM("online", "offline"),
      defaultValue: "online"
    },

    publishedAt: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Tugas',
    tableName: 'Tugas',
    timestamps: true
  });

  return Tugas;
};