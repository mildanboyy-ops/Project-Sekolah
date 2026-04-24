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

    if (!gurus.length) {
      throw new Error("Guru kosong, jalankan seeder Guru dulu");
    }

    const levels = ["SD", "SMP", "SMA", "SMK", "KULIAH", "PESANTREN"];

    const events = [
      "Ujian Tengah Semester",
      "Ujian Akhir Semester",
      "Libur Nasional",
      "Pembagian Raport",
      "Kegiatan Pramuka",
      "Kerja Bakti",
      "Study Tour",
      "Lomba Antar Kelas",
      "Peringatan Hari Besar",
      "Workshop Guru",
      "Pelatihan Siswa",
      "Perubahan Jadwal",
      "Ekstrakurikuler Baru",
      "Kegiatan Olahraga",
      "Pengumuman Akademik"
    ];

    const priorities = ["low", "normal", "high", "urgent"];
    const targets = ["all", "guru", "siswa", "admin"];

    const messages = [
      "Harap seluruh warga sekolah memperhatikan informasi ini.",
      "Wajib diikuti sesuai jadwal yang telah ditentukan.",
      "Informasi resmi dari pihak sekolah.",
      "Mohon kerja sama semua pihak.",
      "Kegiatan ini bersifat wajib.",
      "Harap hadir tepat waktu.",
      "Tidak diperkenankan terlambat.",
      "Absensi akan diperhitungkan.",
      "Silakan hubungi wali kelas jika ada pertanyaan.",
      "Perubahan dapat terjadi sewaktu-waktu."
    ];

    const data = [];

    for (let i = 0; i < 1000; i++) {

      const creator = gurus[i % gurus.length];

      const publishDate = new Date(now);
      publishDate.setDate(now.getDate() - (i % 30));

      const expiredDate = new Date(publishDate);
      expiredDate.setDate(publishDate.getDate() + (7 + (i % 7)));

      data.push({
        id: uuidv4(),

        title: `[${levels[i % levels.length]}] ${events[i % events.length]}`,
        content: messages[i % messages.length],

        priority: priorities[i % priorities.length],
        target: targets[i % targets.length],

        isPublished: true,
        publishAt: publishDate,
        expiredAt: expiredDate,

        // 🔥 FIXED FIELD NAME (sesuai migration)
        createdById: creator.id,
        createdByType: "guru",

        updatedById: creator.id,
        updatedByType: "guru",

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Pengumuman', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pengumuman', null, {});
  }
};