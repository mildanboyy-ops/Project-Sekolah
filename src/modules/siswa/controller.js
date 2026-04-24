const { success, error } = require("../../utils/response")

const {
  tampilSiswa,
  tampilSiswaById,
  tambahSiswa,
  ubahSiswa,
  hapusSiswa
} = require("./service")

// GET ALL
const getAllSiswa = async (req, res) => {
  try {

    const data = await tampilSiswa()

    return success(res, "Data siswa berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getSiswaById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilSiswaById(id)

    return success(res, "Detail siswa berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createSiswa = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahSiswa({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Siswa berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateSiswa = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahSiswa(id, req.body)

    return success(res, "Siswa berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteSiswa = async (req, res) => {
  try {

    const { id } = req.params

    await hapusSiswa(id)

    return success(res, "Siswa berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa
}