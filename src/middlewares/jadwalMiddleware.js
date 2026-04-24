const { body } = require("express-validator")

const createJadwalValidator = [
  body("guruId")
    .notEmpty().withMessage("guruId wajib diisi")
    .isUUID().withMessage("guruId harus UUID"),

  body("mapelId")
    .notEmpty().withMessage("mapelId wajib diisi")
    .isUUID().withMessage("mapelId harus UUID"),

  body("kelasId")
    .notEmpty().withMessage("kelasId wajib diisi")
    .isUUID().withMessage("kelasId harus UUID"),

  body("hari")
    .trim()
    .notEmpty().withMessage("Hari wajib diisi")
    .isIn(["senin","selasa","rabu","kamis","jumat","sabtu"])
    .withMessage("Hari tidak valid"),

  body("jam_mulai")
    .notEmpty().withMessage("Jam mulai wajib diisi")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Format jam mulai HH:mm"),

  body("jam_selesai")
    .notEmpty().withMessage("Jam selesai wajib diisi")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Format jam selesai HH:mm")
    .custom((value, { req }) => {
      if (value <= req.body.jam_mulai) {
        throw new Error("Jam selesai harus setelah jam mulai")
      }
      return true
    })
]

// 🔥 untuk update
const updateJadwalValidator = [
  body("guruId").optional().isUUID().withMessage("guruId harus UUID"),
  body("mapelId").optional().isUUID().withMessage("mapelId harus UUID"),
  body("kelasId").optional().isUUID().withMessage("kelasId harus UUID"),

  body("hari")
    .optional()
    .isIn(["senin","selasa","rabu","kamis","jumat","sabtu"])
    .withMessage("Hari tidak valid"),

  body("jam_mulai")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Format jam mulai HH:mm"),

  body("jam_selesai")
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Format jam selesai HH:mm")
]

module.exports = {
  createJadwalValidator,
  updateJadwalValidator
}