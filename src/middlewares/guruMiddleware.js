const { body } = require("express-validator")

const createGuruValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Nama wajib diisi")
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama hanya boleh huruf"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/).withMessage("Password harus ada huruf besar")
    .matches(/[0-9]/).withMessage("Password harus ada angka")
]

// 🔥 update (lebih fleksibel & aman)
const updateGuruValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama hanya boleh huruf"),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/).withMessage("Password harus ada huruf besar")
    .matches(/[0-9]/).withMessage("Password harus ada angka")
]

module.exports = {
  createGuruValidator,
  updateGuruValidator
}