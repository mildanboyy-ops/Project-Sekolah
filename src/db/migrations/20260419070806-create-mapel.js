'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Mapel', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },

      kodeMapel: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      guruId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Guru',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      kelasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Kelas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      // 🔥 FIX: pakai TIME biar sesuai jam pelajaran
      waktuMulai: {
        type: Sequelize.TIME,
        allowNull: true
      },

      waktuSelesai: {
        type: Sequelize.TIME,
        allowNull: true
      },

      durasiMenit: {
        type: Sequelize.INTEGER,
        defaultValue: 45
      },

      hari: {
        type: Sequelize.ENUM(
          "senin","selasa","rabu","kamis","jumat","sabtu","minggu"
        ),
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM("aktif","nonaktif"),
        defaultValue: "aktif"
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
    await queryInterface.dropTable('Mapel');
  }
};