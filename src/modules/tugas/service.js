const db = require("../../db/models");
const { Tugas, Guru, Mapel } = db;

// GET ALL
const tampilTugas = async () => {
  return await Tugas.findAll({
    include: [
      {
        model: Guru,
        as: "guru",
      },
      {
        model: Mapel,
        as: "mapel",
      }
    ]
  });
};

// GET BY ID
const tampilTugasById = async (id) => {
  return await Tugas.findOne({
    where: { id },
    include: [
      {
        model: Guru,
        as: "guru",
      },
      {
        model: Mapel,
        as: "mapel",
      }
    ]
  });
};

// CREATE
const tambahTugas = async (data) => {
  return await Tugas.create(data);
};

// UPDATE
const ubahTugas = async (id, data) => {
  await Tugas.update(data, { where: { id } });
  return tampilTugasById(id);
};

// DELETE
const hapusTugas = async (id) => {
  return await Tugas.destroy({ where: { id } });
};

// FILTER MAPEL
const tampilTugasByMapel = async (mapelId) => {
  return await Tugas.findAll({
    where: { mapelId },
    include: [
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Mapel,
        as: "mapel"
      }
    ]
  });
};

// FILTER HARI
const tampilTugasByHari = async (hari) => {
  return await Tugas.findAll({
    where: { hari },
    include: [
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Mapel,
        as: "mapel"
      }
    ]
  });
};

module.exports = {
  tampilTugas,
  tampilTugasById,
  tambahTugas,
  ubahTugas,
  hapusTugas,
  tampilTugasByMapel,
  tampilTugasByHari
};