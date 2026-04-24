'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Jadwal', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
        references: {
          model: 'Mapel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      guruId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Guru',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      kelasId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kelas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      hari: {
        type: Sequelize.ENUM(
          "senin","selasa","rabu","kamis","jumat","sabtu","minggu"
        ),
        allowNull: false
      },

      // 🔥 FIX: TIME instead of STRING
      jamMulai: {
        type: Sequelize.TIME,
        allowNull: false
      },

      jamSelesai: {
        type: Sequelize.TIME,
        allowNull: false
      },

      ruangan: {
        type: Sequelize.STRING,
        allowNull: true
      },

      tipe: {
        type: Sequelize.ENUM("regular","tambahan","ujian"),
        defaultValue: "regular"
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Jadwal');
  }
};