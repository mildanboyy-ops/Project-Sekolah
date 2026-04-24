'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    // ambil guru & kelas untuk relasi
    const guruList = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    const kelasList = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!guruList.length || !kelasList.length) {
      throw new Error("Guru atau Kelas kosong, jalankan seeder sebelumnya dulu");
    }

    const mapelBase = [
      "Matematika",
      "Bahasa Indonesia",
      "Bahasa Inggris",
      "IPA",
      "IPS",
      "PJOK",
      "Informatika",
      "Agama"
    ];

    const hariList = [
      "senin", "selasa", "rabu", "kamis", "jumat"
    ];

    const data = [];
    let jamMulai = 7;

    for (let i = 0; i < 80; i++) {

      const name = mapelBase[i % mapelBase.length];
      const hari = hariList[i % hariList.length];

      const guruId = guruList[i % guruList.length].id;
      const kelasId = kelasList[i % kelasList.length].id;

      const start = `${(jamMulai % 24).toString().padStart(2, "0")}:00`;
      const end = `${((jamMulai + 1) % 24).toString().padStart(2, "0")}:00`;

      data.push({
        uuid: uuidv4(),
        kodeMapel: `MP-${i + 1}`,
        name,
        guruId,
        kelasId,
        hari,
        waktuMulai: new Date(`2026-04-19T${start}:00`),
        waktuSelesai: new Date(`2026-04-19T${end}:00`),
        durasiMenit: 45,
        status: "aktif",
        createdAt: now,
        updatedAt: now
      });

      jamMulai++;
    }

    await queryInterface.bulkInsert('Mapel', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Mapel', null, {});
  }
};