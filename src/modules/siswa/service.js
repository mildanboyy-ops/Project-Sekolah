const db = require("../../db/models");
const { Siswa, Kelas, Nilai, Absensi, Tugas } = db;

// GET ALL
const tampilSiswa = async () => {
  return await Siswa.findAll({
    include: [
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Nilai,
        as: "nilai"
      },
      {
        model: Absensi,
        as: "absensi"
      },
      {
        model: Tugas,
        as: "tugas"
      }
    ]
  });
};

// GET BY ID
const tampilSiswaById = async (id) => {
  return await Siswa.findOne({
    where: { id },
    include: [
      {
        model: Kelas,
        as: "kelas"
      },
      {
        model: Nilai,
        as: "nilai"
      },
      {
        model: Absensi,
        as: "absensi"
      },
    ]
  });
};

// CREATE
const tambahSiswa = async (data) => {
  return await Siswa.create(data);
};

// UPDATE
const ubahSiswa = async (id, data) => {
  await Siswa.update(data, {
    where: { id }
  });

  return tampilSiswaById(id);
};

// DELETE
const hapusSiswa = async (id) => {
  return await Siswa.destroy({
    where: { id }
  });
};

module.exports = {
  tampilSiswa,
  tampilSiswaById,
  tambahSiswa,
  ubahSiswa,
  hapusSiswa
};