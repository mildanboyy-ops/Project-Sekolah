const { success, error } = require("../../utils/response")

const {
    tampilAbsensi,
    tampilAbsensiById,
    tambahAbsensi,
    ubahAbsensi,
    hapusAbsensi
} = require("./service")

// GET ALL
const getAllAbsensi = async (req, res) => {
    try {

        const data = await tampilAbsensi()

        return success(res, "Data absensi berhasil didapatkan", data)

    } catch (err) {

        return error(res, err.message)

    }
}

// GET BY ID
const getAbsensiById = async (req, res) => {
    try {

        const { id } = req.params

        const data = await tampilAbsensiById(id)

        return success(res, "Detail absensi berhasil didapatkan", data)

    } catch (err) {

        return error(res, err.message)

    }
}

// CREATE
const createAbsensi = async (req, res) => {
    try {

        const payload = req.user

        const data = await tambahAbsensi({
            ...req.body,
            created_by: payload?.id
        })

        return success(res, "Absensi berhasil dibuat", data)

    } catch (err) {

        return error(res, err.message)

    }
}

// UPDATE
const updateAbsensi = async (req, res) => {
    try {

        const { id } = req.params

        const data = await ubahAbsensi(id, req.body)

        return success(res, "Absensi berhasil diupdate", data)

    } catch (err) {

        return error(res, err.message)

    }
}

// DELETE
const deleteAbsensi = async (req, res) => {
    try {

        const { id } = req.params

        await hapusAbsensi(id)

        return success(res, "Absensi berhasil dihapus")

    } catch (err) {

        return error(res, err.message)

    }
}

module.exports = {
    getAllAbsensi,
    getAbsensiById,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi
}