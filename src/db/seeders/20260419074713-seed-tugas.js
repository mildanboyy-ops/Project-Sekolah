'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const gurus = await queryInterface.sequelize.query(
      `SELECT id, mapelId FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    const mapels = await queryInterface.sequelize.query(
      `SELECT id FROM Mapel`,
      { type: QueryTypes.SELECT }
    );

    if (!gurus.length || !mapels.length) {
      throw new Error("Guru atau Mapel kosong, jalankan seed dulu");
    }

    const statusList = ["draft", "published", "archived"];
    const modeList = ["online", "offline"];
    const tipeList = ["GURU"];

    const tugasList = [
      "Latihan Soal",
      "Tugas Rumah",
      "Ujian Harian",
      "Quiz Online",
      "Praktikum",
      "Proyek Kelompok",
      "Review Materi",
      "Essay Tugas",
      "Presentasi",
      "Refleksi Pembelajaran"
    ];

    const deskripsiList = [
      "Kerjakan dengan teliti dan kumpulkan tepat waktu",
      "Dikerjakan secara individu",
      "Boleh diskusi tapi jawaban harus original",
      "Upload hasil dalam bentuk PDF",
      "Dikumpulkan melalui Google Classroom",
      "Perhatikan instruksi dengan baik",
      "Nilai berdasarkan ketepatan dan kerapihan",
      "Wajib dikumpulkan sebelum deadline",
      "Gunakan referensi buku pelajaran",
      "Jawaban harus ditulis tangan"
    ];

    const tugas = [];

    for (let i = 0; i < 200; i++) {

      const guru = gurus[Math.floor(Math.random() * gurus.length)];
      const mapel = mapels.find(m => m.id === guru.mapelId) || mapels[Math.floor(Math.random() * mapels.length)];

      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

      const deadline = new Date(createdDate);
      deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 7) + 1);

      const status = statusList[Math.floor(Math.random() * statusList.length)];

      tugas.push({
        uuid: uuidv4(),

        guruId: guru.id,
        mapelId: mapel.id,

        namaUjian: `${tugasList[i % tugasList.length]} ${i + 1}`,
        deskripsi: deskripsiList[i % deskripsiList.length],

        file: Math.random() > 0.5 ? `uploads/tugas_${i + 1}.pdf` : null,

        tipe: "GURU",

        hari: createdDate.toLocaleDateString("id-ID", { weekday: "long" }),
        tanggal: createdDate.getDate(),
        bulan: createdDate.getMonth() + 1,
        tahun: createdDate.getFullYear(),
        jamUpload: `${7 + (i % 5)}:00`,

        deadlineTanggal: deadline.getDate(),
        deadlineBulan: deadline.getMonth() + 1,
        deadlineTahun: deadline.getFullYear(),
        deadlineJam: "23:59",

        status,
        bobot: Math.floor(Math.random() * 3) + 1,
        toleransiMenit: Math.floor(Math.random() * 60),

        link: Math.random() > 0.7 ? "https://classroom.google.com" : null,

        modePengumpulan: modeList[Math.floor(Math.random() * modeList.length)],

        publishedAt: status === "published" ? createdDate : null,

        createdAt: createdDate,
        updatedAt: createdDate
      });
    }

    await queryInterface.bulkInsert('Tugas', tugas);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tugas', null, {});
  }
};