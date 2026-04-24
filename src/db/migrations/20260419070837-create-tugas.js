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
        references: {
          model: 'Guru',
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

      namaUjian: {
        type: Sequelize.STRING,
        allowNull: false
      },

      deskripsi: Sequelize.TEXT,
      file: Sequelize.STRING,

      tipe: {
        type: Sequelize.ENUM('GURU', 'MURID'),
        defaultValue: 'GURU'
      },

      hari: Sequelize.STRING,
      tanggal: Sequelize.INTEGER,
      bulan: Sequelize.INTEGER,
      tahun: Sequelize.INTEGER,
      jamUpload: Sequelize.STRING,

      deadlineTanggal: Sequelize.INTEGER,
      deadlineBulan: Sequelize.INTEGER,
      deadlineTahun: Sequelize.INTEGER,
      deadlineJam: Sequelize.STRING,

      status: {
        type: Sequelize.ENUM("draft", "published", "archived"),
        defaultValue: "published"
      },

      bobot: {
        type: Sequelize.FLOAT,
        defaultValue: 1
      },

      toleransiMenit: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      link: Sequelize.STRING,

      modePengumpulan: {
        type: Sequelize.ENUM("online", "offline"),
        defaultValue: "online"
      },

      publishedAt: Sequelize.DATE,

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
    await queryInterface.dropTable('Tugas');
  }
};