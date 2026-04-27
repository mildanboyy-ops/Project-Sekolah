'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Siswa', {

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

      nis: {
        type: Sequelize.STRING,
        allowNull: false,
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

      phone: {
        type: Sequelize.STRING
      },

      address: {
        type: Sequelize.TEXT
      },

      gender: {
        type: Sequelize.ENUM("L", "P")
      },

      birthDate: {
        type: Sequelize.DATEONLY
      },

      parentName: {
        type: Sequelize.STRING
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

      status: {
        type: Sequelize.ENUM("aktif", "pindah", "lulus"),
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
      },

      // 🔥 WAJIB untuk paranoid
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Siswa');
  }
};