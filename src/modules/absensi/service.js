const db = require("../../db/models");
const { Absensi, Guru, Siswa, Mapel, Jadwal } = db;

// GET ALL
const tampilAbsensi = async () => {
  return await Absensi.findAll({
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
      },
      {
        model: Jadwal,
        as: "jadwal",
      }
    ]
  });
};

// GET BY ID
const tampilAbsensiById = async (id) => {
  return await Absensi.findOne({
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
      },
      {
        model: Jadwal,
        as: "jadwal",
      }
    ]
  });
};

// CREATE
const tambahAbsensi = async (data) => {
  return await Absensi.create(data);
};

// UPDATE
const ubahAbsensi = async (id, data) => {
  await Absensi.update(data, { where: { id } });
  return tampilAbsensiById(id);
};

// DELETE
const hapusAbsensi = async (id) => {
  return await Absensi.destroy({
    where: { id }
  });
};

module.exports = {
  tampilAbsensi,
  tampilAbsensiById,
  tambahAbsensi,
  ubahAbsensi,
  hapusAbsensi
};