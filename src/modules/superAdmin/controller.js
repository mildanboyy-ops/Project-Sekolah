const jwt = require("jsonwebtoken")
const { success, error } = require("../../utils/response")

const service = require("./service")

// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await service.loginSuperAdmin(email, password)

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return success(res, "Login berhasil", { token })

  } catch (err) {

    return error(res, err.message, 401)

  }

}

// GET ALL
const getAllSuperAdmin = async (req, res) => {

  try {

    const data = await service.tampilSuperAdmin()

    return success(res, "Data super admin berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }

}

// GET BY ID
const getSuperAdminById = async (req, res) => {

  try {

    const { id } = req.params

    const data = await service.tampilSuperAdminById(id)

    return success(res, "Detail super admin berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }

}

// CREATE
const createSuperAdmin = async (req, res) => {

  try {

    const data = await service.tambahSuperAdmin(req.body)

    return success(res, "Super admin berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }

}

// UPDATE
const updateSuperAdmin = async (req, res) => {

  try {

    const { id } = req.params

    const data = await service.ubahSuperAdmin(id, req.body)

    return success(res, "Super admin berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }

}

// DELETE
const deleteSuperAdmin = async (req, res) => {

  try {

    const { id } = req.params

    await service.hapusSuperAdmin(id)

    return success(res, "Super admin berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }

}

module.exports = {
  login,
  getAllSuperAdmin,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin
}