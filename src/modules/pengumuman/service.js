const db = require("../../db/models");
const { Pengumuman } = db;

const tampilPengumuman = async () => {
  return await Pengumuman.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilPengumumanById = async (id) => {
  return await Pengumuman.findOne({ where: { id } });
};

const tambahPengumuman = async (data) => {
  return await Pengumuman.create(data);
};

const ubahPengumuman = async (id, data) => {
  const pengumuman = await Pengumuman.findOne({ where: { id } });
  if (!pengumuman) throw new Error("Pengumuman tidak ditemukan");

  await pengumuman.update(data);
  return tampilPengumumanById(id);
};

const hapusPengumuman = async (id) => {
  const pengumuman = await Pengumuman.findOne({ where: { id } });
  if (!pengumuman) throw new Error("Pengumuman tidak ditemukan");

  await pengumuman.destroy();
  return true;
};

module.exports = {
  tampilPengumuman,
  tampilPengumumanById,
  tambahPengumuman,
  ubahPengumuman,
  hapusPengumuman
};