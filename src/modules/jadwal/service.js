const db = require("../../db/models");
const { Jadwal } = db;

const tampilJadwal = async () => {
  return await Jadwal.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilJadwalById = async (id) => {
  return await Jadwal.findOne({ where: { id } });
};

const tambahJadwal = async (data) => {
  return await Jadwal.create(data);
};

const ubahJadwal = async (id, data) => {
  const jadwal = await Jadwal.findOne({ where: { id } });
  if (!jadwal) throw new Error("Jadwal tidak ditemukan");

  await jadwal.update(data);
  return tampilJadwalById(id);
};

const hapusJadwal = async (id) => {
  const jadwal = await Jadwal.findOne({ where: { id } });
  if (!jadwal) throw new Error("Jadwal tidak ditemukan");

  await jadwal.destroy();
  return true;
};

module.exports = {
  tampilJadwal,
  tampilJadwalById,
  tambahJadwal,
  ubahJadwal,
  hapusJadwal
};