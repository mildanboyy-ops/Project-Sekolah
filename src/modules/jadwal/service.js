const db = require("../../db/models");
const { Jadwal, Kelas, Guru, Mapel, Absensi } = db;

// GET ALL
const tampilJadwal = async () => {
  return await Jadwal.findAll({
    include: [
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Mapel,
        as: "mapel"
      },
      {
        model: Absensi,
        as: "absensi"
      }
    ]
  });
};

// GET BY ID
const tampilJadwalById = async (id) => {
  return await Jadwal.findOne({
    where: { id },
    include: [
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Guru,
        as: "guru"
      },
      {
        model: Mapel,
        as: "mapel"
      },
      {
        model: Absensi,
        as: "absensi"
      }
    ]
  });
};

// CREATE
const tambahJadwal = async (data) => {
  return await Jadwal.create(data);
};

// UPDATE
const ubahJadwal = async (id, data) => {
  await Jadwal.update(data, { where: { id } });
  return tampilJadwalById(id);
};

// DELETE
const hapusJadwal = async (id) => {
  return await Jadwal.destroy({
    where: { id }
  });
};

module.exports = {
  tampilJadwal,
  tampilJadwalById,
  tambahJadwal,
  ubahJadwal,
  hapusJadwal
};