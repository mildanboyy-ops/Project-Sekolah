const { body } = require("express-validator")

const createPengumumanValidator = [
  body("judul")
    .trim()
    .notEmpty().withMessage("Judul wajib diisi")
    .isLength({ min: 5, max: 100 }).withMessage("Judul 5 - 100 karakter"),

  body("isi")
    .trim()
    .notEmpty().withMessage("Isi pengumuman wajib diisi")
    .isLength({ min: 10 }).withMessage("Isi minimal 10 karakter")
]

const updatePengumumanValidator = [
  body("judul")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage("Judul 5 - 100 karakter"),

  body("isi")
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage("Isi minimal 10 karakter")
]

module.exports = {
  createPengumumanValidator,
  updatePengumumanValidator
}