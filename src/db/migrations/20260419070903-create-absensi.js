'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Absensi', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false
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

      status: {
        type: Sequelize.ENUM('hadir', 'izin', 'sakit', 'alpha'),
        allowNull: false
      },

      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      jamMasuk: {
        type: Sequelize.TIME
      },

      jamKeluar: {
        type: Sequelize.TIME
      },

      keterangan: {
        type: Sequelize.TEXT
      },

      metode: {
        type: Sequelize.ENUM('manual', 'qr', 'gps'),
        defaultValue: 'manual'
      },

      divalidasi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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

    await queryInterface.addConstraint('Absensi', {
      fields: ['siswaId', 'tanggal'],
      type: 'unique',
      name: 'unique_absensi'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Absensi');
  }
};