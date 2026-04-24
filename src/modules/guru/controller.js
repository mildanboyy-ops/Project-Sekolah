const { success, error } = require("../../utils/response.js")

const {
  tambahGuru,
  tampilGuru,
  tampilGuruById,
  ubahGuru,
  hapusGuru,
} = require("./service.js")

// GET ALL
const getAllGuru = async (req, res) => {
  try {

    const data = await tampilGuru()

    return success(res, "Data guru berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getGuruById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilGuruById(id)

    if (!data) {
      return error(res, "Guru tidak ditemukan", 404)
    }

    return success(res, "Detail guru berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createGuru = async (req, res) => {
  try {

    const data = await tambahGuru(req.body)

    return success(res, "Guru berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateGuru = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahGuru(id, req.body)

    return success(res, "Guru berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteGuru = async (req, res) => {
  try {

    const { id } = req.params

    await hapusGuru(id)

    return success(res, "Guru berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru
}