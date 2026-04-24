const { body } = require("express-validator")

const createAbsensiValidator = [
  body("siswaId")
    .notEmpty().withMessage("siswaId wajib diisi")
    .isUUID().withMessage("siswaId harus UUID yang valid"),

  body("status")
    .trim()
    .notEmpty().withMessage("Status wajib diisi")
    .isIn(["hadir", "izin", "sakit", "alpha"])
    .withMessage("Status harus salah satu: hadir, izin, sakit, alpha")
]

// 🔥 untuk update (biar fleksibel)
const updateAbsensiValidator = [
  body("siswaId")
    .optional()
    .isUUID().withMessage("siswaId harus UUID yang valid"),

  body("status")
    .optional()
    .trim()
    .isIn(["hadir", "izin", "sakit", "alpha"])
    .withMessage("Status harus salah satu: hadir, izin, sakit, alpha")
]

module.exports = {
  createAbsensiValidator,
  updateAbsensiValidator
}