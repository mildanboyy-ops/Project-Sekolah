const db = require("../../db/models");
const { Pengumuman, Guru, Admin } = db;

// GET ALL
const tampilPengumuman = async () => {
  return await Pengumuman.findAll({
    include: [
      {
        model: Guru,
        as: "guru",

      },
      {
        model: Admin,
        as: "admin",

      }
    ]
  });
};

// GET BY ID
const tampilPengumumanById = async (id) => {
  return await Pengumuman.findOne({
    where: { id },
    include: [
      {
        model: Guru,
        as: "guru",

      },
      {
        model: Admin,
        as: "admin",

      }
    ]
  });
};

// CREATE
const tambahPengumuman = async (data) => {
  return await Pengumuman.create(data);
};

// UPDATE
const ubahPengumuman = async (id, data) => {
  await Pengumuman.update(data, { where: { id } });
  return tampilPengumumanById(id);
};

// DELETE
const hapusPengumuman = async (id) => {
  return await Pengumuman.destroy({
    where: { id }
  });
};

module.exports = {
  tampilPengumuman,
  tampilPengumumanById,
  tambahPengumuman,
  ubahPengumuman,
  hapusPengumuman
};