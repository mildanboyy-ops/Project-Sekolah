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

    kodeMapel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    deskripsi: {
      type: DataTypes.TEXT
    },

    kategori: {
      type: DataTypes.STRING
    },

    guruId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM('aktif', 'nonaktif'),
      defaultValue: 'aktif'
    }

  }, {
    tableName: 'Mapel',
    timestamps: true
  });

  Mapel.associate = function (models) {

    // 🔥 RELASI KE GURU
    Mapel.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    // 🔥 RELASI KE KELAS
    Mapel.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    // 🔥 RELASI LAIN
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