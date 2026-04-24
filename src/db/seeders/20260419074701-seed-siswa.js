'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const password = await bcrypt.hash("123456", 10);
    const now = new Date();

    // ambil kelas
    const kelas = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!kelas.length) {
      throw new Error("Data Kelas kosong, jalankan seeder Kelas dulu");
    }

    // 🔥 nama khusus SISWA (biar beda dari admin/guru/superadmin)
    const firstNames = [
      "Ahmad", "Rizky", "Fahri", "Ilham", "Dimas", "Bagas", "Rangga",
      "Nanda", "Alif", "Zidan", "Reza", "Bayu", "Rizal", "Aldi",
      "Siti", "Dewi", "Nadia", "Putri", "Aisyah", "Laila", "Nina",
      "Tasya", "Intan", "Citra", "Salma", "Fira", "Nabila"
    ];

    const lastNames = [
      "Saputra", "Pratama", "Maulana", "Ramadhan", "Wijaya",
      "Kurniawan", "Hidayat", "Firmansyah", "Prasetyo",
      "Utama", "Putra", "Setiawan", "Fauzi", "Wibowo"
    ];

    const siswas = Array.from({ length: 500 }, (_, i) => {

      const first = firstNames[i % firstNames.length];
      const last = lastNames[i % lastNames.length];

      const fullName = `${first} ${last}`;

      // 🔥 email UNIQUE + jelas ini siswa
      const email = `siswa.${first.toLowerCase()}.${last.toLowerCase()}${i}@school.com`;

      return {
        uuid: uuidv4(),
        nis: `SIS${String(i + 1).padStart(5, "0")}`,
        name: fullName,
        email,
        password,
        kelasId: kelas[i % kelas.length].id,
        status: "aktif",
        isActive: true,
        createdAt: now,
        updatedAt: now
      };
    });

    await queryInterface.bulkInsert('Siswa', siswas);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Siswa', null, {});
  }
};