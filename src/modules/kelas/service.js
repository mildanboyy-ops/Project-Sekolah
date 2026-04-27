const db = require("../../db/models");
const { Kelas } = db;

const tampilKelas = async () => {
  return await Kelas.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilKelasById = async (id) => {
  return await Kelas.findOne({ where: { id } });
};

const tambahKelas = async (data) => {
  return await Kelas.create(data);
};

const ubahKelas = async (id, data) => {
  const kelas = await Kelas.findOne({ where: { id } });
  if (!kelas) throw new Error("Kelas tidak ditemukan");

  await kelas.update(data);
  return tampilKelasById(id);
};

const hapusKelas = async (id) => {
  const kelas = await Kelas.findOne({ where: { id } });
  if (!kelas) throw new Error("Kelas tidak ditemukan");

  await kelas.destroy();
  return true;
};

module.exports = {
  tampilKelas,
  tampilKelasById,
  tambahKelas,
  ubahKelas,
  hapusKelas
};