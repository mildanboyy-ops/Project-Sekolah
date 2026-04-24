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
      `SELECT id, mapelId FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    const kelas = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!mapels.length || !gurus.length || !kelas.length) {
      throw new Error("Mapel / Guru / Kelas masih kosong, jalankan seeder dulu");
    }

    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    // 🔥 slot jam lebih rapi (real sekolah)
    const jamSlots = [
      { start: "07:00", end: "08:30" },
      { start: "08:30", end: "10:00" },
      { start: "10:00", end: "11:30" },
      { start: "13:00", end: "14:30" },
      { start: "14:30", end: "16:00" }
    ];

    // 🔥 cari guru sesuai mapel (fallback aman)
    const getGuruByMapel = (mapelId) => {
      const match = gurus.filter(g => g.mapelId === mapelId);
      return match.length
        ? match[Math.floor(Math.random() * match.length)]
        : gurus[Math.floor(Math.random() * gurus.length)];
    };

    const jadwals = [];

    for (let i = 0; i < 300; i++) {

      const mapel = mapels[i % mapels.length];
      const kelasItem = kelas[i % kelas.length];
      const guru = getGuruByMapel(mapel.id);
      const jam = jamSlots[i % jamSlots.length];
      const hari = hariList[i % hariList.length];

      jadwals.push({
        id: uuidv4(),
        uuid: uuidv4(),

        mapelId: mapel.id,
        guruId: guru?.id || null,
        kelasId: kelasItem.id,

        hari,
        jamMulai: jam.start,
        jamSelesai: jam.end,

        ruangan: `R-${(i % 20) + 1}`, 
        tipe: "regular",
        isActive: true,

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Jadwal', jadwals);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Jadwal', null, {});
  }
};