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

    const jadwals = await queryInterface.sequelize.query(
      `SELECT id, guruId, mapelId FROM Jadwal`,
      { type: QueryTypes.SELECT }
    );

    if (!siswas.length || !jadwals.length) {
      throw new Error("Siswa atau Jadwal kosong");
    }

    const absensis = [];

    for (let i = 0; i < 5; i++) {

      const tanggal = new Date();
      tanggal.setDate(tanggal.getDate() - i);

      for (const siswa of siswas) {

        const selected = [...jadwals].slice(0, 2);

        for (const jadwal of selected) {

          const rand = Math.random();

          let status = "hadir";
          if (rand > 0.8) status = "izin";
          if (rand > 0.9) status = "sakit";
          if (rand > 0.97) status = "alpha";

          absensis.push({
            id: uuidv4(),
            uuid: uuidv4(), // 🔥 FIX PENTING

            siswaId: siswa.id,
            jadwalId: jadwal.id,

            guruId: jadwal.guruId || null,
            mapelId: jadwal.mapelId || null,

            status,
            tanggal: tanggal.toISOString().split("T")[0],

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
    }

    await queryInterface.bulkInsert('Absensi', absensis);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Absensi', null, {});
  }
};