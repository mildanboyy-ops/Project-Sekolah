'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Pengumuman', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      priority: {
        type: Sequelize.ENUM("low","normal","high","urgent"),
        defaultValue: "normal"
      },

      target: {
        type: Sequelize.ENUM("all","guru","siswa","admin"),
        defaultValue: "all"
      },

      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      publishAt: Sequelize.DATE,
      expiredAt: Sequelize.DATE,


      createdById: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      createdByType: {
        type: Sequelize.ENUM("guru","admin"),
        allowNull: false
      },

      updatedById: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      updatedByType: {
        type: Sequelize.ENUM("guru","admin"),
        allowNull: true
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
    await queryInterface.dropTable('Pengumuman');
  }
};