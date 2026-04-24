const db = require("../../db/models");
const { Nilai, Siswa, Guru, Mapel } = db;

// GET ALL
const tampilNilai = async () => {
  return await Nilai.findAll({
    include: [
      {
        model: Siswa,
        as: "siswa",
      },
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
const tampilNilaiById = async (id) => {
  return await Nilai.findOne({
    where: { id },
    include: [
      {
        model: Siswa,
        as: "siswa",
      },
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
const tambahNilai = async (data) => {
  return await Nilai.create(data);
};

// UPDATE
const ubahNilai = async (id, data) => {
  await Nilai.update(data, { where: { id } });
  return tampilNilaiById(id);
};

// DELETE
const hapusNilai = async (id) => {
  return await Nilai.destroy({
    where: { id }
  });
};

module.exports = {
  tampilNilai,
  tampilNilaiById,
  tambahNilai,
  ubahNilai,
  hapusNilai
};