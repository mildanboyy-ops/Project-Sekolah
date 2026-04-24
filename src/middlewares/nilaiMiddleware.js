const { body } = require("express-validator")

const createNilaiValidator = [
  body("siswaId")
    .notEmpty().withMessage("siswaId wajib diisi")
    .isUUID().withMessage("siswaId harus UUID yang valid"),

  body("mapelId")
    .notEmpty().withMessage("mapelId wajib diisi")
    .isUUID().withMessage("mapelId harus UUID yang valid"),

  body("nilai")
    .notEmpty().withMessage("Nilai wajib diisi")
    .isFloat({ min: 0, max: 100 }).withMessage("Nilai harus antara 0 - 100")
    .toFloat()
]

// 🔥 untuk update (optional)
const updateNilaiValidator = [
  body("siswaId")
    .optional()
    .isUUID().withMessage("siswaId harus UUID yang valid"),

  body("mapelId")
    .optional()
    .isUUID().withMessage("mapelId harus UUID yang valid"),

  body("nilai")
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage("Nilai harus antara 0 - 100")
    .toFloat()
]

module.exports = {
  createNilaiValidator,
  updateNilaiValidator
}