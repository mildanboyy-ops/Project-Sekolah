const { success, error } = require("../../utils/response")

const {
  tampilAdmin,
  tampilAdminById,
  tambahAdmin,
  ubahAdmin,
  hapusAdmin
} = require("./service")

// GET ALL
const getAllAdmin = async (req, res) => {
  try {

    const data = await tampilAdmin()

    return success(res, "Data admin berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getAdminById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilAdminById(id)

    return success(res, "Detail admin berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createAdmin = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahAdmin({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Admin berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateAdmin = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahAdmin(id, req.body)

    return success(res, "Admin berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteAdmin = async (req, res) => {
  try {

    const { id } = req.params

    await hapusAdmin(id)

    return success(res, "Admin berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
}