'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const siswas = await queryInterface.sequelize.query(
      `SELECT id, kelasId FROM Siswa`,
      { type: QueryTypes.SELECT }
    );

    const mapels = await queryInterface.sequelize.query(
      `SELECT id FROM Mapel`,
      { type: QueryTypes.SELECT }
    );

    const gurus = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`, 
      { type: QueryTypes.SELECT }
    );

    const tugasList = await queryInterface.sequelize.query(
      `SELECT id, mapelId FROM Tugas`,
      { type: QueryTypes.SELECT }
    );

    if (!siswas.length || !mapels.length || !gurus.length) {
      throw new Error("Data kosong");
    }

    const jenisList = ["harian", "tugas", "uts", "uas"];
    const semesterList = ["ganjil", "genap"];

    const nilais = [];

    for (const siswa of siswas) {

      const usedCombination = new Set();

      for (let i = 0; i < 6; i++) {

        let mapel, jenis, semester, key;

        // 🔥 loop sampai dapet kombinasi unik
        do {
          mapel = mapels[Math.floor(Math.random() * mapels.length)];
          jenis = jenisList[Math.floor(Math.random() * jenisList.length)];
          semester = semesterList[Math.floor(Math.random() * semesterList.length)];

          key = `${siswa.id}-${mapel.id}-${jenis}-${semester}-2025/2026`;

        } while (usedCombination.has(key));

        usedCombination.add(key);

        const guru = gurus[Math.floor(Math.random() * gurus.length)];

        const tugasFiltered = tugasList.filter(t => t.mapelId === mapel.id);

        const tugas = tugasFiltered.length
          ? tugasFiltered[Math.floor(Math.random() * tugasFiltered.length)]
          : null;

        const nilaiAngka = Number(
          (Math.random() * (95 - 70) + 70).toFixed(2)
        );

        nilais.push({
          uuid: uuidv4(),

          siswaId: siswa.id,
          mapelId: mapel.id,
          guruId: guru.id,

          // 🔥 penting (ambil dari siswa)
          kelasId: siswa.kelasId || null,

          tugasId: tugas ? tugas.id : null,

          nilai: nilaiAngka,

          jenis,
          semester,
          tahunAjaran: "2025/2026",

          catatan: Math.random() > 0.8
            ? "Perlu peningkatan"
            : null,

          createdAt: now,
          updatedAt: now
        });
      }
    }

    await queryInterface.bulkInsert('Nilai', nilais);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Nilai', null, {});
  }
};