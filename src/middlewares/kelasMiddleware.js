const { body } = require("express-validator")

const createKelasValidator = [
  body("nama_kelas")
    .trim()
    .notEmpty().withMessage("Nama kelas wajib diisi")
    .isLength({ min: 2 }).withMessage("Nama kelas minimal 2 karakter"),

  body("tingkat")
    .notEmpty().withMessage("Tingkat wajib diisi")
    .isInt({ min: 1, max: 12 }).withMessage("Tingkat harus antara 1 - 12")
]

// 🔥 untuk update (optional)
const updateKelasValidator = [
  body("nama_kelas")
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage("Nama kelas minimal 2 karakter"),

  body("tingkat")
    .optional()
    .isInt({ min: 1, max: 12 }).withMessage("Tingkat harus antara 1 - 12")
]

module.exports = {
  createKelasValidator,
  updateKelasValidator
}