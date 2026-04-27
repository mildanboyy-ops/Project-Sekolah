'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const gurus = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    if (!gurus.length) {
      throw new Error("Data Guru kosong, jalankan seeder Guru dulu");
    }

    const tingkatList = ["X", "XI", "XII"];
    const jurusanList = ["IPA", "IPS", "RPL", "TKJ", "MM"];

    const kelas = [];

    for (let i = 0; i < gurus.length; i++) {

      const tingkat = tingkatList[i % tingkatList.length];
      const jurusan = jurusanList[i % jurusanList.length];
      const rombel = Math.floor(i / jurusanList.length) + 1;

      kelas.push({
        uuid: uuidv4(),
        name: `Kelas ${tingkat} ${jurusan} ${rombel}`,
        tingkat,
        jurusan,
        kapasitas: 30,

        // 🔥 FIX: ini jangan 10 hardcode, biar sinkron model (default 0)
        jumlahSiswa: 10,

        // 🔥 FIX: sesuai migration (aktif / nonaktif)
        status: "guru",

        waliKelasId: gurus[i].id,

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Kelas', kelas);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Kelas', null, {});
  }
};