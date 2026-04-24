const express = require("express")
const router = express.Router()

const {
  getAllPengumuman,
  getPengumumanById,
  createPengumuman,
  updatePengumuman,
  deletePengumuman
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createPengumumanValidator,
  updatePengumumanValidator
} = require("../../middlewares/pengumumanMiddleware")

const { param } = require("express-validator")

// 🔥 validator id
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin","guru","siswa"]),
  getAllPengumuman
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru","siswa"]),
  validate(idValidator),
  getPengumumanById
)

router.post(
  "/create",
  auth,
  role(["admin","super_admin","guru"]),
  validate(createPengumumanValidator),
  createPengumuman
)

router.put(
  "/update/:id",
  auth,
  role(["admin","super_admin","guru"]),
  validate([...idValidator, ...updatePengumumanValidator]),
  updatePengumuman
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deletePengumuman
)

module.exports = router