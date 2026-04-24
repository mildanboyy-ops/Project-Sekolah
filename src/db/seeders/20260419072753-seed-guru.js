'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const password = await bcrypt.hash("123456", 10);
    const now = new Date();

    const kelas = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );


    if (!kelas.length) {
      throw new Error("Kelas kosong, jalankan seeder dulu");
    }

    const names = [
      "Ahmad Fauzan", "Budi Santoso", "Rizky Pratama", "Andi Saputra", "Hendra Wijaya",
      "Siti Aisyah", "Dewi Lestari", "Nurul Hidayah", "Fitriani", "Putri Maharani",
      "Muhammad Iqbal", "Fahri Ramadhan", "Ilham Maulana", "Dimas Pratama", "Bagas Saputra",
      "Agus Salim", "Eko Prasetyo", "Yudi Hartono", "Rudi Hermawan", "Joko Widodo",
      "Sri Wahyuni", "Maya Sari", "Indah Permata", "Lina Marlina", "Sari Wulandari",
      "Rina Agustina", "Nina Kartika", "Tika Lestari", "Wawan Setiawan", "Teguh Prabowo"
    ];

    const genders = ["L", "P"];

    const gurus = Array.from({ length: 80 }, (_, i) => {

      const name = names[i % names.length];

      const gender = genders[Math.floor(Math.random() * genders.length)];

      const birthYear = 1980 + (i % 20);
      const birthDate = `${birthYear}-0${(i % 9) + 1}-15`;

      const nip = `1987${String(i + 1).padStart(4, "0")}`;

      return {
        uuid: uuidv4(),
        nip,
        name,
        email: `${name.toLowerCase().replace(/ /g, ".")}${i}@gmail.com`,
        password,
        phone: `0812${Math.floor(10000000 + Math.random() * 90000000)}`,
        address: "Indonesia",
        gender,
        birthDate,
        kelasId: kelas[i % kelas.length].id,
        isActive: true,
        createdAt: now,
        updatedAt: now
      };
    });

    await queryInterface.bulkInsert('Guru', gurus);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Guru', null, {});
  }
};