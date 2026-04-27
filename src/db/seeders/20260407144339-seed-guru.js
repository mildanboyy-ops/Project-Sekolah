'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    const rawGurus = [
      {
        name: "Sukma Hidayatullah",
        email: "sukma@school.id",
        password: "sukma123"
      },
      {
        name: "Indra Ardianto",
        email: "indra@school.id",
        password: "indra123"
      },
      {
        name: "Ibrahim Al-Farisi",
        email: "ibrahim@school.id",
        password: "ibrahim123"
      },
      {
        name: "Wahyu Ilahi",
        email: "wahyu@school.id",
        password: "wahyu123"
      }
    ];

    const gurus = [];

    for (const guru of rawGurus) {

      const hashedPassword = await bcrypt.hash(guru.password, 10);

      gurus.push({
        uuid: uuidv4(),

        nip: `1987${Math.floor(1000 + Math.random() * 9000)}`,

        name: guru.name,
        email: guru.email.toLowerCase(),
        password: hashedPassword,

        phone: "081200000000",
        address: "Indonesia",

        gender: Math.random() > 0.5 ? "L" : "P",
        birthDate: "1990-01-01",

        isWaliKelas: false,

        // 🔥 HARUS SESUAI ENUM MIGRATION
        status: "guru",

        isActive: true,

        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert('Guru', gurus);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Guru', null, {});
  }
};