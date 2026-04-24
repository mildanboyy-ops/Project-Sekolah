const { success, error } = require("../../utils/response")

const {
  tampilKelas,
  tampilKelasById,
  tambahKelas,
  ubahKelas,
  hapusKelas
} = require("./service")

// GET ALL
const getAllKelas = async (req, res) => {
  try {

    const data = await tampilKelas()

    return success(res, "Data kelas berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getKelasById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilKelasById(id)

    return success(res, "Detail kelas berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createKelas = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahKelas({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Kelas berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateKelas = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahKelas(id, req.body)

    return success(res, "Kelas berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteKelas = async (req, res) => {
  try {

    const { id } = req.params

    await hapusKelas(id)

    return success(res, "Kelas berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas
}