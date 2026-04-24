'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Nilai', {

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

      mapelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Mapel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      guruId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Guru',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // 🔥 FIX: HARUS INTEGER (sesuai Tugas.id)
      tugasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Tugas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      nilai: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      jenis: {
        type: Sequelize.ENUM("harian", "tugas", "uts", "uas"),
        defaultValue: "harian"
      },

      tanggal: Sequelize.DATEONLY,

      bobot: {
        type: Sequelize.FLOAT,
        defaultValue: 1
      },

      semester: {
        type: Sequelize.ENUM("ganjil", "genap")
      },

      tahunAjaran: Sequelize.STRING,

      catatan: Sequelize.TEXT,

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
    await queryInterface.dropTable('Nilai');
  }
};