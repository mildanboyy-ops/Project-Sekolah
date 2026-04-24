const express = require("express")
const router = express.Router()

const {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const { param } = require("express-validator")

// 🔥 validator id (sama seperti pengumuman)
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

// ===================== ROUTES =====================

router.get(
  "/",
  auth,
  role(["admin", "super_admin", "guru", "siswa"]),
  getAllSiswa
)

router.get(
  "/search/:id",
  auth,
  role(["admin", "super_admin", "guru", "siswa"]),
  validate(idValidator),
  getSiswaById
)

router.post(
  "/create",
  auth,
  role(["admin", "super_admin", "guru"]),
  createSiswa
)

router.put(
  "/update/:id",
  auth,
  role(["admin", "super_admin", "guru"]),
  validate(idValidator),
  updateSiswa
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin", "super_admin", "guru"]),
  validate(idValidator),
  deleteSiswa
)

module.exports = router