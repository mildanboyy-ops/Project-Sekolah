const db = require("../../db/models");
const { Nilai } = db;

const tampilNilai = async () => {
  return await Nilai.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilNilaiById = async (id) => {
  return await Nilai.findOne({ where: { id } });
};

const tambahNilai = async (data) => {
  return await Nilai.create(data);
};

const ubahNilai = async (id, data) => {
  const nilai = await Nilai.findOne({ where: { id } });
  if (!nilai) throw new Error("Nilai tidak ditemukan");

  await nilai.update(data);
  return tampilNilaiById(id);
};

const hapusNilai = async (id) => {
  const nilai = await Nilai.findOne({ where: { id } });
  if (!nilai) throw new Error("Nilai tidak ditemukan");

  await nilai.destroy();
  return true;
};

module.exports = {
  tampilNilai,
  tampilNilaiById,
  tambahNilai,
  ubahNilai,
  hapusNilai
};