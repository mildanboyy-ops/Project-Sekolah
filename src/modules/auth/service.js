const db = require("../../db/models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { Admin, SuperAdmin, Guru, Siswa } = db

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  )
}

// 🔥 helper biar bisa email / name
const buildWhere = (email, name) => {
  const where = {}

  if (email && name) {
    where[db.Sequelize.Op.or] = [
      { email },
      { name }
    ]
  } else if (email) {
    where.email = email
  } else if (name) {
    where.name = name
  }

  return where
}

//
// LOGIN SUPER ADMIN
//
const loginSuperAdmin = async (email, password) => {

  const user = await SuperAdmin.findOne({
    where: buildWhere(email, null)
  })

  if (!user) {
    throw new Error("User tidak ditemukan")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error("Password salah")
  }

  const token = generateToken(user.id, "super_admin")

  return { token, user }
}

//
// LOGIN ADMIN
//
const loginAdmin = async (email, name, password) => {

  const user = await Admin.findOne({
    where: buildWhere(email, name)
  })

  if (!user) {
    throw new Error("User tidak ditemukan")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error("Password salah")
  }

  const token = generateToken(user.id, "admin")

  return { token, user }
}

//
// LOGIN GURU
//
const loginGuru = async (email, name, password) => {

  const user = await Guru.findOne({
    where: buildWhere(email, name)
  })

  if (!user) {
    throw new Error("User tidak ditemukan")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error("Password salah")
  }

  const token = generateToken(user.id, "guru")

  return { token, user }
}

//
// LOGIN SISWA
//
const loginSiswa = async (email, name, password) => {

  const user = await Siswa.findOne({
    where: buildWhere(email, name)
  })

  if (!user) {
    throw new Error("User tidak ditemukan")
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error("Password salah")
  }

  const token = generateToken(user.id, "siswa")

  return { token, user }
}

module.exports = {
  loginSuperAdmin,
  loginAdmin,
  loginGuru,
  loginSiswa
}