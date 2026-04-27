'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Tugas', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
      },

      guruId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Guru', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      mapelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Mapel', key: 'id' },
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

      siswaId: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'Siswa',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      description: Sequelize.TEXT,

      file: Sequelize.STRING,
      link: Sequelize.STRING,

      publishedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      deadlineAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft'
      },

      modePengumpulan: {
        type: Sequelize.ENUM('online', 'offline'),
        defaultValue: 'online'
      },

      bobot: {
        type: Sequelize.FLOAT,
        defaultValue: 1
      },

      toleransiMenit: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tugas');
  }
};