'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    // ambil admin untuk wali kelas
    const admins = await queryInterface.sequelize.query(
      `SELECT id FROM Admin WHERE role = 'admin'`,
      { type: QueryTypes.SELECT }
    );

    if (!admins.length) {
      throw new Error("Data Admin kosong, jalankan seeder Admin dulu");
    }

    const tingkatList = ["X", "XI", "XII"];
    const jurusanList = ["IPA", "IPS", "RPL", "TKJ", "MM"];

    const kelas = [];
    const target = 120; // biar lebih realistis (tidak terlalu banyak)

    for (let i = 0; i < target; i++) {

      const tingkat = tingkatList[i % tingkatList.length];
      const jurusan = jurusanList[i % jurusanList.length];

      const rombel = (Math.floor(i / jurusanList.length) + 1);

      const kapasitas = 30;
      const jumlahSiswa = Math.floor(Math.random() * 30); // dummy realistis

      kelas.push({
        uuid: uuidv4(),
        name: `Kelas ${tingkat} ${jurusan} ${rombel}`,
        tingkat,
        jurusan,
        kapasitas,
        jumlahSiswa,
        status: "aktif",
        waliKelasId: admins[i % admins.length].id,
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