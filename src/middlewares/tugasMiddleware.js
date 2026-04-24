const { body } = require("express-validator")

const createTugasValidator = [
  body("judul")
    .trim()
    .notEmpty().withMessage("Judul wajib diisi")
    .isLength({ min: 5, max: 100 }).withMessage("Judul 5 - 100 karakter"),

  body("deskripsi")
    .trim()
    .notEmpty().withMessage("Deskripsi wajib diisi")
    .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter"),

  body("deadline")
    .notEmpty().withMessage("Deadline wajib diisi")
    .isISO8601().withMessage("Format deadline harus tanggal valid")
    .custom((value) => {
      const now = new Date()
      const inputDate = new Date(value)

      if (inputDate < now) {
        throw new Error("Deadline tidak boleh di masa lalu")
      }

      return true
    })
]

// 🔥 untuk update (optional)
const updateTugasValidator = [
  body("judul")
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage("Judul 5 - 100 karakter"),

  body("deskripsi")
    .optional()
    .trim()
    .isLength({ min: 10 }).withMessage("Deskripsi minimal 10 karakter"),

  body("deadline")
    .optional()
    .isISO8601().withMessage("Format deadline harus tanggal valid")
]

module.exports = {
  createTugasValidator,
  updateTugasValidator
}