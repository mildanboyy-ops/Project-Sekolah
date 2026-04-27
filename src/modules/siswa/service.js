const db = require("../../db/models");
const { Siswa } = db;

const tampilSiswa = async () => {
  return await Siswa.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilSiswaById = async (id) => {
  return await Siswa.findOne({ where: { id } });
};

const tambahSiswa = async (data) => {
  return await Siswa.create(data);
};

const ubahSiswa = async (id, data) => {
  const siswa = await Siswa.findOne({ where: { id } });
  if (!siswa) throw new Error("Siswa tidak ditemukan");

  await siswa.update(data);
  return tampilSiswaById(id);
};

const hapusSiswa = async (id) => {
  const siswa = await Siswa.findOne({ where: { id } });
  if (!siswa) throw new Error("Siswa tidak ditemukan");

  await siswa.destroy();
  return true;
};

module.exports = {
  tampilSiswa,
  tampilSiswaById,
  tambahSiswa,
  ubahSiswa,
  hapusSiswa
};