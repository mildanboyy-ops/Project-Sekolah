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
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: DataTypes.STRING,
    address: DataTypes.TEXT,

    gender: DataTypes.ENUM("L", "P"),

    birthDate: DataTypes.DATEONLY,

    kelasId: DataTypes.INTEGER,
    mapelId: DataTypes.INTEGER,

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Guru',
    timestamps: true
  });

  Guru.associate = function(models) {

    Guru.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    Guru.belongsTo(models.Mapel, {
      foreignKey: 'mapelId',
      as: 'mapel'
    });

    Guru.hasMany(models.Jadwal, {
      foreignKey: 'guruId',
      as: 'jadwal'
    });

    Guru.hasMany(models.Nilai, {
      foreignKey: 'guruId',
      as: 'nilai'
    });

    Guru.hasMany(models.Tugas, {
      foreignKey: 'guruId',
      as: 'tugas'
    });

  };

  return Guru;
};