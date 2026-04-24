'use strict';

module.exports = (sequelize, DataTypes) => {

  const Siswa = sequelize.define('Siswa', {

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

    nis: {
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
    alamat: DataTypes.TEXT,

    gender: {
      type: DataTypes.ENUM("L", "P")
    },

    tanggalLahir: DataTypes.DATEONLY,
    namaWali: DataTypes.STRING,

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    status: {
      type: DataTypes.ENUM("aktif", "pindah", "lulus"),
      defaultValue: "aktif"
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Siswa',
    timestamps: true
  });

  Siswa.associate = function(models) {

    Siswa.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    Siswa.hasMany(models.Nilai, {
      foreignKey: 'siswaId',
      as: 'nilai'
    });

    Siswa.hasMany(models.Absensi, {
      foreignKey: 'siswaId',
      as: 'absensi'
    });


  };

  return Siswa;
};