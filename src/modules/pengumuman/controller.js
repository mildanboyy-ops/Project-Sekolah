const { success, error } = require("../../utils/response")

const {
  tampilPengumuman,
  tampilPengumumanById,
  tambahPengumuman,
  ubahPengumuman,
  hapusPengumuman
} = require("./service")

// GET ALL
const getAllPengumuman = async (req, res) => {
  try {

    const data = await tampilPengumuman()

    return success(res, "Data pengumuman berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getPengumumanById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilPengumumanById(id)

    return success(res, "Detail pengumuman berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createPengumuman = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahPengumuman({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Pengumuman berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updatePengumuman = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahPengumuman(id, req.body)

    return success(res, "Pengumuman berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deletePengumuman = async (req, res) => {
  try {

    const { id } = req.params

    await hapusPengumuman(id)

    return success(res, "Pengumuman berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllPengumuman,
  getPengumumanById,
  createPengumuman,
  updatePengumuman,
  deletePengumuman
}