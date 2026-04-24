const db = require("../../db/models");
const { Mapel, Guru, Kelas, Jadwal, Nilai, Tugas } = db;

// GET ALL (WITH INCLUDE)
const tampilMapel = async () => {
  return await Mapel.findAll({
    include: [
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Jadwal,
        as: "jadwal"
      },
      {
        model: Nilai,
        as: "nilai"
      },
      {
        model: Tugas,
        as: "tugas"
      }
    ]
  });
};

// GET BY ID (WITH INCLUDE)
const tampilMapelById = async (id) => {
  return await Mapel.findOne({
    where: { id },
    include: [
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Jadwal,
        as: "jadwal"
      },
      {
        model: Nilai,
        as: "nilai"
      },
      {
        model: Tugas,
        as: "tugas"
      }
    ]
  });
};

// CREATE
const tambahMapel = async (data) => {
  return await Mapel.create(data);
};

// UPDATE
const ubahMapel = async (id, data) => {
  await Mapel.update(data, { where: { id } });
  return tampilMapelById(id);
};

// DELETE
const hapusMapel = async (id) => {
  return await Mapel.destroy({
    where: { id }
  });
};

module.exports = {
  tampilMapel,
  tampilMapelById,
  tambahMapel,
  ubahMapel,
  hapusMapel
};