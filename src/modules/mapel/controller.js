const { success, error } = require("../../utils/response")

const {
  tampilMapel,
  tampilMapelById,
  tambahMapel,
  ubahMapel,
  hapusMapel
} = require("./service")

// GET ALL
const getAllMapel = async (req, res) => {
  try {

    const data = await tampilMapel()

    return success(res, "Data mapel berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// GET BY ID
const getMapelById = async (req, res) => {
  try {

    const { id } = req.params

    const data = await tampilMapelById(id)

    return success(res, "Detail mapel berhasil didapatkan", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// CREATE
const createMapel = async (req, res) => {
  try {

    const payload = req.user

    const data = await tambahMapel({
      ...req.body,
      created_by: payload?.id
    })

    return success(res, "Mapel berhasil dibuat", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// UPDATE
const updateMapel = async (req, res) => {
  try {

    const { id } = req.params

    const data = await ubahMapel(id, req.body)

    return success(res, "Mapel berhasil diupdate", data)

  } catch (err) {

    return error(res, err.message)

  }
}

// DELETE
const deleteMapel = async (req, res) => {
  try {

    const { id } = req.params

    await hapusMapel(id)

    return success(res, "Mapel berhasil dihapus")

  } catch (err) {

    return error(res, err.message)

  }
}

module.exports = {
  getAllMapel,
  getMapelById,
  createMapel,
  updateMapel,
  deleteMapel
}