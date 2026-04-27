'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const mapels = await queryInterface.sequelize.query(
      `SELECT id FROM Mapel`,
      { type: QueryTypes.SELECT }
    );

    const gurus = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    const kelas = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!mapels.length || !gurus.length || !kelas.length) {
      throw new Error("Mapel / Guru / Kelas masih kosong");
    }

    const hariList = ["senin", "selasa", "rabu", "kamis", "jumat"];

    const jamSlots = [
      { start: "07:00:00", end: "08:30:00" },
      { start: "08:30:00", end: "10:00:00" },
      { start: "10:00:00", end: "11:30:00" },
      { start: "13:00:00", end: "14:30:00" },
      { start: "14:30:00", end: "16:00:00" }
    ];

    const jadwals = [];

    // 🔥 LOOP AMAN (NO TABRAKAN)
    for (const kelasItem of kelas) {
      for (const hari of hariList) {
        for (const jam of jamSlots) {

          const mapel = mapels[Math.floor(Math.random() * mapels.length)];
          const guru = gurus[Math.floor(Math.random() * gurus.length)];

          jadwals.push({
            uuid: uuidv4(),

            mapelId: mapel.id,
            guruId: guru.id,
            kelasId: kelasItem.id,

            hari,
            jamMulai: jam.start,
            jamSelesai: jam.end,

            ruangan: `R-${Math.floor(Math.random() * 20) + 1}`,
            tipe: "regular",
            status: "aktif",
            isActive: true,

            createdAt: now,
            updatedAt: now
          });

        }
      }
    }

    await queryInterface.bulkInsert('Jadwal', jadwals);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Jadwal', null, {});
  }
};