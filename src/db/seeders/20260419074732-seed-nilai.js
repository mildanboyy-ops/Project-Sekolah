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

    const mapels = await queryInterface.sequelize.query(
      `SELECT id, name FROM Mapel`,
      { type: QueryTypes.SELECT }
    );

    const gurus = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    if (!siswas.length || !mapels.length || !gurus.length) {
      throw new Error("Data Siswa / Mapel / Guru masih kosong");
    }

    const jenisList = ["harian", "tugas", "uts", "uas"];
    const semesterList = ["ganjil", "genap"];
    const tahunAjaranList = ["2024/2025", "2025/2026"];

    const gradeRange = {
      SD: [80, 100],
      SMP: [75, 95],
      SMA: [70, 92],
      SMK: [70, 90],
      KULIAH: [65, 88],
      PESANTREN: [85, 100]
    };

    const detectLevel = (name) => {
      if (!name) return "SMA";

      const n = name.toLowerCase();

      if (n.includes("sd")) return "SD";
      if (n.includes("smp")) return "SMP";
      if (n.includes("smk")) return "SMK";
      if (n.includes("kuliah") || n.includes("ai") || n.includes("kalkulus")) return "KULIAH";
      if (n.includes("nahwu") || n.includes("fiqih") || n.includes("arab")) return "PESANTREN";

      return "SMA";
    };

    const nilais = [];

    for (const siswa of siswas) {

      const jumlahNilai = Math.floor(Math.random() * 6) + 6; // 6–11 nilai per siswa

      for (let i = 0; i < jumlahNilai; i++) {

        const mapel = mapels[Math.floor(Math.random() * mapels.length)];
        const guru = gurus[Math.floor(Math.random() * gurus.length)];

        const level = detectLevel(mapel.name);
        const range = gradeRange[level];

        const nilai = Number(
          (Math.random() * (range[1] - range[0]) + range[0]).toFixed(2)
        );

        nilais.push({
          id: uuidv4(),
          uuid: uuidv4(),

          siswaId: siswa.id,
          mapelId: mapel.id,
          guruId: guru.id,

          nilai,
          jenis: jenisList[Math.floor(Math.random() * jenisList.length)],
          semester: semesterList[Math.floor(Math.random() * semesterList.length)],
          tahunAjaran: tahunAjaranList[Math.floor(Math.random() * tahunAjaranList.length)],

          catatan: Math.random() > 0.7 ? "Perlu peningkatan pada materi tertentu" : null,

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
