const bcrypt = require("bcrypt")
const db = require("../../db/models/index.js")

const { Guru, Kelas, Mapel, Jadwal, Nilai, Tugas } = db

// CREATE
const tambahGuru = async (data) => {

  const password = await bcrypt.hash(data.password, 10)

  return await Guru.create({
    name: data.name,
    email: data.email,
    password,
    kelasId: data.kelasId || null,
    mapelId: data.mapelId || null
  })
}

// GET ALL (WITH INCLUDE)
const tampilGuru = async () => {
  return await Guru.findAll({
    where: { isActive: true },
    include: [
      { model: Kelas, as: "kelas" },
      { model: Mapel, as: "mapel" },
      { model: Jadwal, as: "jadwal" },
      { model: Nilai, as: "nilai" },
      { model: Tugas, as: "tugas" }
    ]
  })
}

// GET BY ID
const tampilGuruById = async (id) => {
  return await Guru.findOne({
    where: { id },
    include: [
      { model: Kelas, as: "kelas" },
      { model: Mapel, as: "mapel" },
      { model: Jadwal, as: "jadwal" },
      { model: Nilai, as: "nilai" },
      { model: Tugas, as: "tugas" }
    ]
  })
}

// UPDATE
const ubahGuru = async (id, data) => {

  const guru = await Guru.findOne({ where: { id } })

  if (!guru) {
    throw new Error("Guru tidak ditemukan")
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }

  return await guru.update(data)
}

// DELETE
const hapusGuru = async (id) => {

  const guru = await Guru.findOne({ where: { id } })

  if (!guru) {
    throw new Error("Guru tidak ditemukan")
  }

  await guru.destroy()

  return true
}

module.exports = {
  tambahGuru,
  tampilGuru,
  tampilGuruById,
  ubahGuru,
  hapusGuru
}