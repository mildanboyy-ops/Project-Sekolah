const express = require("express")
const router = express.Router()

const {
  getAllJadwal,
  getJadwalById,
  createJadwal,
  updateJadwal,
  deleteJadwal
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createJadwalValidator,
  updateJadwalValidator
} = require("../../middlewares/jadwalMiddleware")

const { param } = require("express-validator")

// 🔥 validator id
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin","guru"]),
  getAllJadwal
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru"]),
  validate(idValidator),
  getJadwalById
)

router.post(
  "/create",
  auth,
  role(["admin","super_admin"]),
  validate(createJadwalValidator),
  createJadwal
)

router.put(
  "/update/:id",
  auth,
  role(["admin","super_admin"]),
  validate([...idValidator, ...updateJadwalValidator]),
  updateJadwal
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deleteJadwal
)

module.exports = router