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
  validate,
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
  validate,
  updateSiswa
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin", "super_admin", "guru"]),
  validate,
  deleteSiswa
)

module.exports = router