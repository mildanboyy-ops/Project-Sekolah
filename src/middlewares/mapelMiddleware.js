const { body } = require("express-validator")

const createMapelValidator = [
  body("nama_mapel")
    .trim()
    .notEmpty().withMessage("Nama mapel wajib diisi")
    .isLength({ min: 3 }).withMessage("Nama mapel minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama mapel hanya boleh huruf")
]

// 🔥 untuk update
const updateMapelValidator = [
  body("nama_mapel")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Nama mapel minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama mapel hanya boleh huruf")
]

module.exports = {
  createMapelValidator,
  updateMapelValidator
}