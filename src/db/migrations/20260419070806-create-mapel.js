'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Mapel', {

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

      kodeMapel: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      kategori: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // 🔥 FOREIGN KEY
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

      status: {
        type: Sequelize.ENUM('aktif', 'nonaktif'),
        defaultValue: 'aktif'
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Mapel');
  }
};