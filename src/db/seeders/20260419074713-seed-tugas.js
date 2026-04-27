'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    // 🔥 ambil data jadwal
    const jadwals = await queryInterface.sequelize.query(
      `SELECT guruId, mapelId, kelasId FROM Jadwal`,
      { type: QueryTypes.SELECT }
    );

    // 🔥 ambil siswa biar bisa assign tugas
    const siswas = await queryInterface.sequelize.query(
      `SELECT id FROM Siswa`,
      { type: QueryTypes.SELECT }
    );

    if (!jadwals.length) {
      throw new Error("Jadwal kosong, jalankan seeder Jadwal dulu");
    }

    if (!siswas.length) {
      throw new Error("Siswa kosong, jalankan seeder Siswa dulu");
    }

    const titles = [
      "Latihan Soal",
      "Tugas Rumah",
      "Ujian Harian",
      "Quiz Online",
      "Praktikum",
      "Proyek Kelompok",
      "Essay",
      "Presentasi"
    ];

    const descriptions = [
      "Kerjakan dengan teliti",
      "Dikerjakan secara individu",
      "Upload dalam bentuk PDF",
      "Perhatikan instruksi",
      "Kumpulkan tepat waktu"
    ];

    const statusList = ["draft", "published", "archived"];
    const modeList = ["online", "offline"];

    const tugas = [];

    let index = 1;

    for (const jadwal of jadwals) {

      const jumlahTugas = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < jumlahTugas; i++) {

        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 10));

        const deadline = new Date(createdDate);
        deadline.setDate(deadline.getDate() + (Math.floor(Math.random() * 5) + 1));

        const status = statusList[Math.floor(Math.random() * statusList.length)];

        const randomSiswa = siswas[Math.floor(Math.random() * siswas.length)];

        tugas.push({
          uuid: uuidv4(),

          guruId: jadwal.guruId,
          mapelId: jadwal.mapelId,
          kelasId: jadwal.kelasId,

          siswaId: randomSiswa.id,

          title: `${titles[index % titles.length]} ${index}`,
          description: descriptions[index % descriptions.length],

          file: Math.random() > 0.5 ? `uploads/tugas_${index}.pdf` : null,
          link: Math.random() > 0.7 ? "https://classroom.google.com" : null,

          publishedAt: status === "published" ? createdDate : null,
          deadlineAt: deadline,

          status,
          modePengumpulan: modeList[Math.floor(Math.random() * modeList.length)],

          bobot: Math.floor(Math.random() * 3) + 1,
          toleransiMenit: Math.floor(Math.random() * 60),

          isActive: true,

          createdAt: createdDate,
          updatedAt: createdDate
        });

        index++;
      }
    }

    await queryInterface.bulkInsert('Tugas', tugas);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tugas', null, {});
  }
};