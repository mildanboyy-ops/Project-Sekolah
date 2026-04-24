const { body } = require("express-validator")

const createSiswaValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Nama wajib diisi")
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama hanya boleh huruf"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password wajib diisi")
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
]

// 🔥 untuk update
const updateSiswaValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage("Nama minimal 3 karakter")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Nama hanya boleh huruf"),

  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 }).withMessage("Password minimal 6 karakter")
]

module.exports = {
  createSiswaValidator,
  updateSiswaValidator
}