'use strict';

module.exports = (sequelize, DataTypes) => {

  const Nilai = sequelize.define('Nilai', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
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

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    tugasId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    nilai: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },

    jenis: {
      type: DataTypes.ENUM("harian", "tugas", "uts", "uas"),
      defaultValue: "harian"
    },

    semester: {
      type: DataTypes.ENUM("ganjil", "genap"),
      allowNull: false
    },

    tahunAjaran: {
      type: DataTypes.STRING,
      allowNull: false
    },

    tanggal: {
      type: DataTypes.DATE
    },

    bobot: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },

    catatan: {
      type: DataTypes.TEXT
    }

  }, {
    tableName: 'Nilai',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['siswaId', 'mapelId', 'jenis', 'semester', 'tahunAjaran']
      }
    ]
  });

  Nilai.associate = (models) => {

    Nilai.belongsTo(models.Siswa, { foreignKey: 'siswaId', as: 'siswa' });
    Nilai.belongsTo(models.Guru, { foreignKey: 'guruId', as: 'guru' });
    Nilai.belongsTo(models.Mapel, { foreignKey: 'mapelId', as: 'mapel' });
    Nilai.belongsTo(models.Kelas, { foreignKey: 'kelasId', as: 'kelas' });
    Nilai.belongsTo(models.Tugas, { foreignKey: 'tugasId', as: 'tugas' });

  };

  return Nilai;
};