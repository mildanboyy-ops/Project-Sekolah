const { success, error } = require("../../utils/response");

const {
  tampilTugas,
  tampilTugasById,
  tambahTugas,
  ubahTugas,
  hapusTugas,
  tampilTugasByMapel,
  tampilTugasByHari
} = require("./service");

// GET ALL
const getAllTugas = async (req, res) => {
  try {
    const data = await tampilTugas();
    return success(res, "Data tugas berhasil didapatkan", data);
  } catch (err) {
    return error(res, err.message);
  }
};

// GET BY ID
const getTugasById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tampilTugasById(id);
    return success(res, "Detail tugas berhasil didapatkan", data);
  } catch (err) {
    return error(res, err.message);
  }
};

// CREATE
const createTugas = async (req, res) => {
  try {
    const payload = req.user;
    const body = req.body;

    if (req.file) {
      body.file = "uploads/" + req.file.filename;
    }

    const data = await tambahTugas({
      ...body,
      created_by: payload?.id
    });

    return success(res, "Tugas berhasil dibuat", data);

  } catch (err) {
    return error(res, err.message);
  }
};

// UPDATE
const updateTugas = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (req.file) {
      body.file = "uploads/" + req.file.filename;
    }

    const data = await ubahTugas(id, body);

    return success(res, "Tugas berhasil diupdate", data);

  } catch (err) {
    return error(res, err.message);
  }
};

// DELETE
const deleteTugas = async (req, res) => {
  try {
    const { id } = req.params;

    await hapusTugas(id);

    return success(res, "Tugas berhasil dihapus");

  } catch (err) {
    return error(res, err.message);
  }
};

// FILTER MAPEL
const getTugasByMapel = async (req, res) => {
  try {
    const { mapelId } = req.params;

    const data = await tampilTugasByMapel(mapelId);

    return success(res, "Tugas berdasarkan mapel", data);

  } catch (err) {
    return error(res, err.message);
  }
};

// FILTER HARI
const getTugasByHari = async (req, res) => {
  try {
    const { hari } = req.params;

    const data = await tampilTugasByHari(hari);

    return success(res, "Tugas berdasarkan hari", data);

  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = {
  getAllTugas,
  getTugasById,
  createTugas,
  updateTugas,
  deleteTugas,
  getTugasByMapel,
  getTugasByHari
};