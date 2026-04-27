const db = require("../../db/models");
const { Mapel } = db;

const tampilMapel = async () => {
  return await Mapel.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const tampilMapelById = async (id) => {
  return await Mapel.findOne({ where: { id } });
};

const tambahMapel = async (data) => {
  return await Mapel.create(data);
};

const ubahMapel = async (id, data) => {
  const mapel = await Mapel.findOne({ where: { id } });
  if (!mapel) throw new Error("Mapel tidak ditemukan");

  await mapel.update(data);
  return tampilMapelById(id);
};

const hapusMapel = async (id) => {
  const mapel = await Mapel.findOne({ where: { id } });
  if (!mapel) throw new Error("Mapel tidak ditemukan");

  await mapel.destroy();
  return true;
};

module.exports = {
  tampilMapel,
  tampilMapelById,
  tambahMapel,
  ubahMapel,
  hapusMapel
};