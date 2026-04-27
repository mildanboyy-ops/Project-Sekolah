'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Jadwal', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },

      mapelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Mapel', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      guruId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Guru', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      kelasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Kelas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      hari: {
        type: Sequelize.ENUM(
          "senin","selasa","rabu","kamis","jumat","sabtu","minggu"
        ),
        allowNull: false
      },

      jamMulai: {
        type: Sequelize.TIME,
        allowNull: false
      },

      jamSelesai: {
        type: Sequelize.TIME,
        allowNull: false
      },

      ruangan: {
        type: Sequelize.STRING
      },

      tipe: {
        type: Sequelize.ENUM("regular","tambahan","ujian"),
        defaultValue: "regular"
      },

      status: {
        type: Sequelize.ENUM("aktif","nonaktif"),
        defaultValue: "aktif"
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 🔥 anti bentrok jadwal kelas
    await queryInterface.addConstraint('Jadwal', {
      fields: ['kelasId', 'hari', 'jamMulai'],
      type: 'unique',
      name: 'unique_jadwal_kelas_hari_jam'
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Jadwal');
  }
};