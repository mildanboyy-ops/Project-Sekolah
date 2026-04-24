const db = require("../../db/models")
const bcrypt = require("bcrypt")

const { SuperAdmin } = db

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

  return user
}

module.exports = {
  loginSuperAdmin
}