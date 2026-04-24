const { body } = require("express-validator")

const createAdminValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Nama wajib diisi")
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Format email tidak valid")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
]

// 🔥 update (optional semua)
const updateAdminValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter"),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Format email tidak valid")
    .normalizeEmail(),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
]

module.exports = {
  createAdminValidator,
  updateAdminValidator
}