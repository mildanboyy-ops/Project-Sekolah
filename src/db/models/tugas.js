'use strict';

module.exports = (sequelize, DataTypes) => {

  const Tugas = sequelize.define('Tugas', {

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

    guruId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    mapelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // 🔥 RELASI SIMPLE KE SISWA
    siswaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: DataTypes.TEXT,
    file: DataTypes.STRING,
    link: DataTypes.STRING,

    publishedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    deadlineAt: {
      type: DataTypes.DATE,
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft'
    },

    modePengumpulan: {
      type: DataTypes.ENUM('online', 'offline'),
      defaultValue: 'online'
    },

    bobot: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },

    toleransiMenit: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Tugas',
    timestamps: true
  });

  Tugas.associate = (models) => {

    Tugas.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    Tugas.belongsTo(models.Mapel, {
      foreignKey: 'mapelId',
      as: 'mapel'
    });

    Tugas.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    // 🔥 RELASI KE SISWA (SIMPLE)
    Tugas.belongsTo(models.Siswa, {
      foreignKey: 'siswaId',
      as: 'siswa'
    });

    Tugas.hasMany(models.Nilai, {
      foreignKey: 'tugasId',
      as: 'nilai'
    });

  };

  return Tugas;
};