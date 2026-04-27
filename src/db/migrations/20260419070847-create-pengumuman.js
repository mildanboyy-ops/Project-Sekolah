'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Pengumuman', {

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

      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },

      publishAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      expiredAt: Sequelize.DATE,

      // 🔥 CREATOR
      createdById: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      createdByType: {
        type: Sequelize.ENUM("guru","admin"),
        allowNull: false
      },

      // 🔥 UPDATER (INI YANG KURANG DI MODEL)
      updatedById: {
        type: Sequelize.INTEGER
      },

      updatedByType: {
        type: Sequelize.ENUM("guru","admin")
      },

      status: {
        type: Sequelize.ENUM("draft","published","archived"),
        defaultValue: "published"
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

    await queryInterface.addIndex('Pengumuman', ['target']);
    await queryInterface.addIndex('Pengumuman', ['priority']);
    await queryInterface.addIndex('Pengumuman', ['publishAt']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Pengumuman');
  }
};