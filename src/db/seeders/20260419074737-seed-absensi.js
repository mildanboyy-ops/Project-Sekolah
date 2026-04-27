'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const siswas = await queryInterface.sequelize.query(
      `SELECT id FROM Siswa`,
      { type: QueryTypes.SELECT }
    );

    if (!siswas.length) {
      throw new Error("Siswa kosong");
    }

    const absensis = [];
    const used = new Set();

    for (let d = 0; d < 5; d++) {

      const tanggal = new Date();
      tanggal.setHours(0, 0, 0, 0);
      tanggal.setDate(tanggal.getDate() - d);

      for (const siswa of siswas) {

        const key = `${siswa.id}-${tanggal.toISOString()}`;

        if (used.has(key)) continue;
        used.add(key);

        const rand = Math.random();

        let status = "hadir";
        if (rand > 0.85) status = "izin";
        if (rand > 0.92) status = "sakit";
        if (rand > 0.97) status = "alpha";

        absensis.push({
          uuid: uuidv4(),

          siswaId: siswa.id,

          status,
          tanggal,

          jamMasuk: status === "hadir" ? "07:00:00" : null,
          jamKeluar: status === "hadir" ? "12:00:00" : null,

          keterangan: status,
          metode: "manual",
          divalidasi: status === "hadir",

          createdAt: now,
          updatedAt: now
        });
      }
    }

    await queryInterface.bulkInsert('Absensi', absensis);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Absensi', null, {});
  }
};