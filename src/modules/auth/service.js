const db = require("../../db/models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { Admin, SuperAdmin, Guru, Siswa } = db

// helper generate token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  )
}

//
// LOGIN SUPER ADMIN
//
const loginSuperAdmin = async (email, password) => {

  const user = await SuperAdmin.findOne({
    where: { email }
  })

  if (!user) {
    throw new Error("Email tidak ditemukan")
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
const loginAdmin = async (email, password) => {

  const user = await Admin.findOne({
    where: { email }
  })

  if (!user) {
    throw new Error("Email tidak ditemukan")
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
const loginGuru = async (name, password) => {

  const user = await Guru.findOne({
    where: { name }
  })

  if (!user) {
    throw new Error("Nama tidak ditemukan")
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
const loginSiswa = async (name, password) => {

  const user = await Siswa.findOne({
    where: { name }
  })

  if (!user) {
    throw new Error("Nama tidak ditemukan")
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