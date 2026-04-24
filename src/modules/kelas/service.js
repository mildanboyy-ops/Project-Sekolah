const db = require("../../db/models");
const { Kelas, Siswa, Guru, Jadwal, Admin } = db;

// GET ALL (WITH INCLUDE)
const tampilKelas = async () => {
  return await Kelas.findAll({
    include: [
      {
        model: Siswa,
        as: "siswa"
      },
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Jadwal,
        as: "jadwal"
      },
      {
        model: Admin,
        as: "waliKelas"
      }
    ]
  });
};

// GET BY ID (WITH INCLUDE)
const tampilKelasById = async (id) => {
  return await Kelas.findOne({
    where: { id },
    include: [
      {
        model: Siswa,
        as: "siswa"
      },
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Jadwal,
        as: "jadwal"
      },
      {
        model: Admin,
        as: "waliKelas"
      }
    ]
  });
};

// CREATE
const tambahKelas = async (data) => {
  return await Kelas.create(data);
};

// UPDATE
const ubahKelas = async (id, data) => {
  await Kelas.update(data, { where: { id } });
  return tampilKelasById(id);
};

// DELETE
const hapusKelas = async (id) => {
  return await Kelas.destroy({
    where: { id }
  });
};

module.exports = {
  tampilKelas,
  tampilKelasById,
  tambahKelas,
  ubahKelas,
  hapusKelas
};