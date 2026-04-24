const { body } = require("express-validator")

const createSuperAdminValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/).withMessage("Password harus ada huruf besar")
    .matches(/[0-9]/).withMessage("Password harus ada angka")
]

// 🔥 untuk update
const updateSuperAdminValidator = [
  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Format email tidak valid")
    .normalizeEmail(),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
    .matches(/[A-Z]/).withMessage("Password harus ada huruf besar")
    .matches(/[0-9]/).withMessage("Password harus ada angka")
]

module.exports = {
  createSuperAdminValidator,
  updateSuperAdminValidator
}