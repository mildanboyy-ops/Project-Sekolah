'use strict';

module.exports = (sequelize, DataTypes) => {

  const Mapel = sequelize.define('Mapel', {

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

    kodeMapel: DataTypes.STRING,

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    guruId: DataTypes.INTEGER,
    kelasId: DataTypes.INTEGER,

    waktuMulai: DataTypes.TIME,
    waktuSelesai: DataTypes.TIME,

    durasiMenit: {
      type: DataTypes.INTEGER,
      defaultValue: 45
    },

    hari: DataTypes.ENUM(
      "senin","selasa","rabu","kamis","jumat","sabtu","minggu"
    ),

    status: {
      type: DataTypes.ENUM("aktif","nonaktif"),
      defaultValue: "aktif"
    }

  }, {
    tableName: 'Mapel',
    timestamps: true
  });

  Mapel.associate = function(models) {

    Mapel.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    Mapel.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    Mapel.hasMany(models.Jadwal, {
      foreignKey: 'mapelId',
      as: 'jadwal'
    });

    Mapel.hasMany(models.Nilai, {
      foreignKey: 'mapelId',
      as: 'nilai'
    });

    Mapel.hasMany(models.Tugas, {
      foreignKey: 'mapelId',
      as: 'tugas'
    });

  };

  return Mapel;
};