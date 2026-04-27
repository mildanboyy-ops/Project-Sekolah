'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Admin', {

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

      role: {
        type: Sequelize.ENUM("super_admin", "admin"),
        allowNull: false,
        defaultValue: "admin"
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
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

      avatar: {
        type: Sequelize.STRING
      },

      lastLogin: {
        type: Sequelize.DATE
      },

      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // 🔥 STATUS AKUN
      status: {
        type: Sequelize.ENUM("active", "suspended"),
        defaultValue: "active"
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      // 🔥 SECURITY (NILAI PLUS BANGET)
      loginAttempt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      lockedUntil: {
        type: Sequelize.DATE
      },

      // 🔥 SOFT DELETE
      deletedAt: {
        type: Sequelize.DATE
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

    // 🔥 INDEX (LOGIN CEPAT)
    await queryInterface.addIndex('Admin', ['email']);

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Admin');
  }
};