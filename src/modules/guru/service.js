const db = require("../../db/models");
const { Guru } = db;

// =====================
// GET ALL
// =====================
const tampilGuru = async () => {
  return await Guru.findAll({
    order: [["createdAt", "DESC"]]
  });
};

// =====================
// GET BY ID
// =====================
const tampilGuruById = async (id) => {
  return await Guru.findOne({
    where: { id }
  });
};

// =====================
// CREATE
// =====================
const tambahGuru = async (data) => {
  return await Guru.create(data);
};

// =====================
// UPDATE
// =====================
const ubahGuru = async (id, data) => {
  const guru = await Guru.findOne({ where: { id } });

  if (!guru) {
    throw new Error("Guru tidak ditemukan");
  }

  await guru.update(data);

  return tampilGuruById(id);
};

// =====================
// DELETE
// =====================
const hapusGuru = async (id) => {
  const guru = await Guru.findOne({ where: { id } });

  if (!guru) {
    throw new Error("Guru tidak ditemukan");
  }

  await guru.destroy();

  return true;
};

module.exports = {
  tampilGuru,
  tampilGuruById,
  tambahGuru,
  ubahGuru,
  hapusGuru
};