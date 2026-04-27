'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Kelas', {

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

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      tingkat: {
        type: Sequelize.ENUM("X", "XI", "XII"),
        allowNull: false
      },

      jurusan: {
        type: Sequelize.STRING,
        allowNull: false
      },

      kapasitas: {
        type: Sequelize.INTEGER,
        defaultValue: 30
      },

      jumlahSiswa: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },

      status: {
        type: Sequelize.ENUM("aktif", "nonaktif", "guru"),
        defaultValue: "guru"
      },

      waliKelasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Guru',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Kelas');
  }
};