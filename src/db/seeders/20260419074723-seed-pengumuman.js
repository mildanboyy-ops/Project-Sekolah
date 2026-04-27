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

    const admins = await queryInterface.sequelize.query(
      `SELECT id FROM Admin`,
      { type: QueryTypes.SELECT }
    );

    if (!gurus.length && !admins.length) {
      throw new Error("Guru & Admin kosong");
    }

    const events = [
      "Ujian Tengah Semester",
      "Ujian Akhir Semester",
      "Libur Nasional",
      "Pembagian Raport",
      "Kegiatan Pramuka",
      "Study Tour",
      "Lomba Antar Kelas",
      "Workshop Guru",
      "Pelatihan Siswa",
      "Perubahan Jadwal"
    ];

    const priorities = ["low", "normal", "high", "urgent"];
    const targets = ["all", "guru", "siswa", "admin"];

    const messages = [
      "Harap seluruh warga sekolah memperhatikan informasi ini.",
      "Wajib diikuti sesuai jadwal.",
      "Informasi resmi dari sekolah.",
      "Mohon kerja sama semua pihak.",
      "Harap hadir tepat waktu."
    ];

    const data = [];

    for (let i = 0; i < 150; i++) {

      const useGuru = Math.random() > 0.5;

      const creator = useGuru
        ? gurus[i % gurus.length]
        : admins[i % admins.length];

      const createdByType = useGuru ? "guru" : "admin";

      const publishDate = new Date(now);
      publishDate.setDate(now.getDate() - (i % 20));

      const expiredDate = new Date(publishDate);
      expiredDate.setDate(publishDate.getDate() + 7);

      data.push({
        uuid: uuidv4(), // ✅ FIX (pakai ini, bukan id)

        title: `${events[i % events.length]} #${i + 1}`,
        content: messages[i % messages.length],

        priority: priorities[i % priorities.length],
        target: targets[i % targets.length],

        isPublished: true,
        publishAt: publishDate,
        expiredAt: expiredDate,

        createdById: creator.id,
        createdByType,

        updatedById: creator.id,
        updatedByType: createdByType,

        status: "published", 
        isActive: true,       

        createdAt: publishDate,
        updatedAt: publishDate
      });
    }

    await queryInterface.bulkInsert('Pengumuman', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pengumuman', null, {});
  }
};