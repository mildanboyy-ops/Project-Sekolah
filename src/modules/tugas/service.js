const db = require("../../db/models");
const { Tugas } = db;

const tampilTugas = async () => {
  return await Tugas.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilTugasById = async (id) => {
  return await Tugas.findOne({ where: { id } });
};

const tambahTugas = async (data) => {
  return await Tugas.create(data);
};

const ubahTugas = async (id, data) => {
  const tugas = await Tugas.findOne({ where: { id } });
  if (!tugas) throw new Error("Tugas tidak ditemukan");

  await tugas.update(data);
  return tampilTugasById(id);
};

const hapusTugas = async (id) => {
  const tugas = await Tugas.findOne({ where: { id } });
  if (!tugas) throw new Error("Tugas tidak ditemukan");

  await tugas.destroy();
  return true;
};

module.exports = {
  tampilTugas,
  tampilTugasById,
  tambahTugas,
  ubahTugas,
  hapusTugas
};