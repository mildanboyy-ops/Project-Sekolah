'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Siswa', {

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

      nis: {
        type: Sequelize.STRING,
        unique: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },

      phone: Sequelize.STRING,
      alamat: Sequelize.TEXT,

      gender: {
        type: Sequelize.ENUM("L", "P")
      },

      tanggalLahir: Sequelize.DATEONLY,

      namaWali: Sequelize.STRING,

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

      status: {
        type: Sequelize.ENUM("aktif","pindah","lulus"),
        defaultValue: "aktif"
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Siswa');
  }
};