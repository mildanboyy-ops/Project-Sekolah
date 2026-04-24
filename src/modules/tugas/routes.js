const express = require("express")
const router = express.Router()

const {
  getAllTugas,
  getTugasById,
  createTugas,
  updateTugas,
  deleteTugas,
  getTugasByMapel,
  getTugasByHari
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const upload = require("../../middlewares/uploadMiddleware")

const { param } = require("express-validator")

// ================= VALIDATOR =================
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

const mapelValidator = [
  param("mapelId").isUUID().withMessage("Mapel ID harus UUID")
]

const hariValidator = [
  param("hari")
    .isIn(["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"])
    .withMessage("Hari tidak valid")
]

// ================= ROUTES =================

// GET ALL
router.get("/", getAllTugas)

// GET BY ID
router.get(
  "/search/:id",
  validate(idValidator),
  getTugasById
)

// FILTER MAPEL
router.get(
  "/mapel/:mapelId",
  validate(mapelValidator),
  getTugasByMapel
)

// FILTER HARI
router.get(
  "/hari/:hari",
  validate(hariValidator),
  getTugasByHari
)

// CREATE
router.post(
  "/create",
  auth,
  role(["guru", "admin", "super_admin"]),
  upload.single("file"),
  createTugas
)

// UPDATE
router.put(
  "/update/:id",
  auth,
  role(["guru", "admin", "super_admin"]),
  validate(idValidator),
  upload.single("file"),
  updateTugas
)

// DELETE
router.delete(
  "/delete/:id",
  auth,
  role(["admin", "super_admin"]),
  validate(idValidator),
  deleteTugas
)

module.exports = router