'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Absensi', {

      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },

      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.UUIDV4
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

      jadwalId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Jadwal',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // 🔥 FIX: TAMBAH RELASI YANG KAMU PAKAI DI MODEL
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

      mapelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Mapel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      status: {
        type: Sequelize.ENUM('hadir', 'izin', 'sakit', 'alpha'),
        allowNull: false
      },

      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      jamMasuk: Sequelize.TIME,
      jamKeluar: Sequelize.TIME,

      keterangan: Sequelize.TEXT,

      metode: {
        type: Sequelize.ENUM("manual", "qr", "gps"),
        defaultValue: "manual"
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Absensi');
  }
};