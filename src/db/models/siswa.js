'use strict';

module.exports = (sequelize, DataTypes) => {

  const Siswa = sequelize.define('Siswa', {

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

    nis: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    gender: DataTypes.ENUM("L", "P"),
    birthDate: DataTypes.DATEONLY,
    parentName: DataTypes.STRING,

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    timestamps: true,
    paranoid: true
  });

  Siswa.associate = (models) => {

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

    // 🔥 RELASI KE TUGAS (FIX)
    Siswa.hasMany(models.Tugas, {
      foreignKey: 'siswaId',
      as: 'tugas'
    });

  };

  return Siswa;
};