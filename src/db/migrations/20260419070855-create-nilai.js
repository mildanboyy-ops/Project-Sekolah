'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Nilai', {

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

      siswaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Siswa', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

      // 🔥 FIX DI SINI
      kelasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Kelas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      tugasId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Tugas', key: 'id' },
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

      semester: {
        type: Sequelize.ENUM("ganjil", "genap"),
        allowNull: false
      },

      tahunAjaran: {
        type: Sequelize.STRING,
        allowNull: false
      },

      tanggal: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      bobot: {
        type: Sequelize.FLOAT,
        defaultValue: 1
      },

      catatan: {
        type: Sequelize.TEXT
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

    // 🔥 UNIQUE INDEX (AMAN)
    await queryInterface.addConstraint('Nilai', {
      fields: ['siswaId', 'mapelId', 'jenis', 'semester', 'tahunAjaran'],
      type: 'unique',
      name: 'unique_nilai_per_siswa_mapel'
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('Nilai');
  }
};