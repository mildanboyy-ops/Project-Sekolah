const {
  loginSuperAdmin,
  loginAdmin,
  loginGuru,
  loginSiswa
} = require("./service")

// LOGIN SUPER ADMIN
const loginSuperAdminController = async (req, res) => {
  try {

    const { email, password } = req.body

    const data = await loginSuperAdmin(email, password)

    res.status(200).json({
      msg: "Login Super Admin berhasil",
      data
    })

  } catch (error) {

    res.status(400).json({
      msg: error.message
    })

  }
}

// LOGIN ADMIN
const loginAdminController = async (req, res) => {
  try {

    const { email, password } = req.body

    const data = await loginAdmin(email, password)

    res.status(200).json({
      msg: "Login Admin berhasil",
      data
    })

  } catch (error) {

    res.status(400).json({
      msg: error.message
    })

  }
}

// LOGIN GURU (PAKAI NAME)
const loginGuruController = async (req, res) => {
  try {

    const { name, password } = req.body

    const data = await loginGuru(name, password)

    res.status(200).json({
      msg: "Login Guru berhasil",
      data
    })

  } catch (error) {

    res.status(400).json({
      msg: error.message
    })

  }
}

// LOGIN SISWA (PAKAI NAME)
const loginSiswaController = async (req, res) => {
  try {

    const { name, password } = req.body

    const data = await loginSiswa(name, password)

    res.status(200).json({
      msg: "Login Siswa berhasil",
      data
    })

  } catch (error) {

    res.status(400).json({
      msg: error.message
    })

  }
}

module.exports = {
  loginSuperAdminController,
  loginAdminController,
  loginGuruController,
  loginSiswaController
}