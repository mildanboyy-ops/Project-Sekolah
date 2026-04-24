const { success, error } = require("../../utils/response")

const {
  tampilNilai,
  tampilNilaiById,
  tambahNilai,
  ubahNilai,
  hapusNilai
} = require("./service")

// GET ALL
const getAllNilai = async (req, res) => {
  try {

    const data = await tampilNilai()

    return success(res, "Data nilai berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getNilaiById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilNilaiById(id)

    return success(res, "Detail nilai berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createNilai = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahNilai({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Nilai berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateNilai = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahNilai(id, req.body)

    return success(res, "Nilai berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteNilai = async (req, res) => {
  try {

    const { id } = req.params

    await hapusNilai(id)

    return success(res, "Nilai berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllNilai,
  getNilaiById,
  createNilai,
  updateNilai,
  deleteNilai
}