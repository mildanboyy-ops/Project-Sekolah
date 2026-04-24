const { success, error } = require("../../utils/response")

const {
  tampilJadwal,
  tampilJadwalById,
  tambahJadwal,
  ubahJadwal,
  hapusJadwal
} = require("./service")

// GET ALL
const getAllJadwal = async (req, res) => {
  try {

    const data = await tampilJadwal()

    return success(res, "Data jadwal berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getJadwalById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilJadwalById(id)

    return success(res, "Detail jadwal berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createJadwal = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahJadwal({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Jadwal berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateJadwal = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahJadwal(id, req.body)

    return success(res, "Jadwal berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteJadwal = async (req, res) => {
  try {

    const { id } = req.params

    await hapusJadwal(id)

    return success(res, "Jadwal berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal
}