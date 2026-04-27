'use strict';

const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const now = new Date();

    // 🔥 ambil data Guru & Kelas dari DB
    const gurus = await queryInterface.sequelize.query(
      `SELECT id FROM Guru`,
      { type: QueryTypes.SELECT }
    );

    const kelas = await queryInterface.sequelize.query(
      `SELECT id FROM Kelas`,
      { type: QueryTypes.SELECT }
    );

    if (!gurus.length || !kelas.length) {
      throw new Error("Data Guru / Kelas kosong");
    }

    const mapelList = [
      { name: "Matematika", kategori: "Wajib" },
      { name: "Bahasa Indonesia", kategori: "Wajib" },
      { name: "Bahasa Inggris", kategori: "Wajib" },
      { name: "Sosiologi", kategori: "Wajib" },
      { name: "Geografi", kategori: "Wajib" },
      { name: "Ekonomi", kategori: "Non Akademik" },
      { name: "Informatika", kategori: "Produktif" },
      { name: "Fisika", kategori: "Wajib" },
      { name: "Kimia", kategori: "Wajib" },
      { name: "Biologi", kategori: "Non Akademik" }
    ];

    const data = mapelList.map((item, i) => ({
      uuid: uuidv4(),
      kodeMapel: `MP-${String(i + 1).padStart(3, "0")}`,
      name: item.name,
      deskripsi: `Pelajaran ${item.name}`,
      kategori: item.kategori,

      // 🔥 ISI RELASI (biar nggak NULL)
      guruId: gurus[i % gurus.length].id,
      kelasId: kelas[i % kelas.length].id,

      status: "aktif",
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('Mapel', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Mapel', null, {});
  }
};