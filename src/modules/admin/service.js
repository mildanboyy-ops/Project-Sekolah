const bcrypt = require("bcrypt")
const db = require("../../db/models/index.js")

const { Admin, Pengumuman } = db

// GET ALL
const tampilAdmin = async () => {
  return await Admin.findAll({
    where: { role: "admin" },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Pengumuman,
        as: "pengumuman"
      }
    ]
  })
}

// GET BY ID
const tampilAdminById = async (id) => {
  return await Admin.findOne({
    where: {
      id,
      role: "admin"
    },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Pengumuman,
        as: "pengumuman"
      }
    ]
  })
}

// CREATE
const tambahAdmin = async (data) => {

  const password = await bcrypt.hash(data.password, 10)

  return await Admin.create({
    name: data.name,
    email: data.email,
    password,
    role: "admin"
  })
}

// UPDATE
const ubahAdmin = async (id, data) => {

  const admin = await Admin.findOne({
    where: { id, role: "admin" }
  })

  if (!admin) {
    throw new Error("Admin tidak ditemukan")
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }

  await admin.update(data)

  return tampilAdminById(id)
}

// DELETE
const hapusAdmin = async (id) => {

  const admin = await Admin.findOne({
    where: { id, role: "admin" }
  })

  if (!admin) {
    throw new Error("Admin tidak ditemukan")
  }

  await admin.destroy()

  return true
}

module.exports = {
  tampilAdmin,
  tampilAdminById,
  tambahAdmin,
  ubahAdmin,
  hapusAdmin
}