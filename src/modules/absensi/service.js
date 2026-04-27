const db = require("../../db/models");
const { Absensi } = db;

const tampilAbsensi = async () => {
  return await Absensi.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilAbsensiById = async (id) => {
  return await Absensi.findOne({ where: { id } });
};

const tambahAbsensi = async (data) => {
  return await Absensi.create(data);
};

const ubahAbsensi = async (id, data) => {
  const absensi = await Absensi.findOne({ where: { id } });
  if (!absensi) throw new Error("Absensi tidak ditemukan");

  await absensi.update(data);
  return tampilAbsensiById(id);
};

const hapusAbsensi = async (id) => {
  const absensi = await Absensi.findOne({ where: { id } });
  if (!absensi) throw new Error("Absensi tidak ditemukan");

  await absensi.destroy();
  return true;
};

module.exports = {
  tampilAbsensi,
  tampilAbsensiById,
  tambahAbsensi,
  ubahAbsensi,
  hapusAbsensi
};