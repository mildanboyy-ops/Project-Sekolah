'use strict';

module.exports = (sequelize, DataTypes) => {

  const Jadwal = sequelize.define('Jadwal', {

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

    mapelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    guruId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    kelasId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    hari: {
      type: DataTypes.ENUM(
        "senin","selasa","rabu","kamis","jumat","sabtu","minggu"
      ),
      allowNull: false
    },

    jamMulai: {
      type: DataTypes.TIME,
      allowNull: false
    },

    jamSelesai: {
      type: DataTypes.TIME,
      allowNull: false
    },

    ruangan: DataTypes.STRING,

    tipe: {
      type: DataTypes.ENUM("regular","tambahan","ujian"),
      defaultValue: "regular"
    },

    status: {
      type: DataTypes.ENUM("aktif","nonaktif"),
      defaultValue: "aktif"
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, {
    tableName: 'Jadwal',
    timestamps: true
  });

  Jadwal.associate = function(models) {

    Jadwal.belongsTo(models.Kelas, {
      foreignKey: 'kelasId',
      as: 'kelas'
    });

    Jadwal.belongsTo(models.Guru, {
      foreignKey: 'guruId',
      as: 'guru'
    });

    Jadwal.belongsTo(models.Mapel, {
      foreignKey: 'mapelId',
      as: 'mapel'
    });

  };

  return Jadwal;
};