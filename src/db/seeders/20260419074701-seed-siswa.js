'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const kelasList = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!kelasList.length) {
      throw new Error("Data Kelas kosong");
    }

    const rawSiswas = [
      {
        name: "Muhammad Hilmy Zaky",
        email: "hilmy@siswa.com",
        password: "hilmy123",
        phone: "081234567890",
        address: "Jakarta Selatan",
        gender: "L",
        birthDate: "2006-05-12",
        parentName: "Bapak Zaky"
      },
      {
        name: "Muhammad Al-Faruq",
        email: "faruq@siswa.com",
        password: "faruq123",
        phone: "081234567891",
        address: "Depok",
        gender: "L",
        birthDate: "2006-03-20",
        parentName: "Bapak Faruq"
      },
      {
        name: "Nurul Musthofa",
        email: "tofa@siswa.com",
        password: "tofa123",
        phone: "081234567892",
        address: "Bogor",
        gender: "P",
        birthDate: "2006-07-15",
        parentName: "Ibu Musthofa"
      },
      {
        name: "Ahmad Faisal Amar",
        email: "ahmad@siswa.com",
        password: "ahmad123",
        phone: "081234567893",
        address: "Bekasi",
        gender: "L",
        birthDate: "2006-01-10",
        parentName: "Bapak Amar"
      }
    ];

    const siswas = [];

    for (let i = 0; i < rawSiswas.length; i++) {

      const siswa = rawSiswas[i];
      const hashedPassword = await bcrypt.hash(siswa.password, 10);

      siswas.push({
        uuid: uuidv4(),
        nis: `SIS${String(i + 1).padStart(5, "0")}`,
        name: siswa.name,
        email: siswa.email.toLowerCase(),
        password: hashedPassword,

        // 🔥 tambahan biar nggak NULL
        phone: siswa.phone,
        address: siswa.address,
        gender: siswa.gender,
        birthDate: siswa.birthDate,
        parentName: siswa.parentName,

        kelasId: kelasList[i % kelasList.length].id,

        status: "aktif",
        isActive: true,

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Siswa', siswas);

  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Siswa', null, {});
  }
};