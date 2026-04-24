const express = require("express")
const router = express.Router()

const {
  getAllNilai,
  getNilaiById,
  createNilai,
  updateNilai,
  deleteNilai
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createNilaiValidator,
  updateNilaiValidator
} = require("../../middlewares/nilaiMiddleware")

const { param } = require("express-validator")

// 🔥 validator id
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin","guru"]),
  getAllNilai
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru"]),
  validate(idValidator),
  getNilaiById
)

router.post(
  "/create",
  auth,
  role(["guru","admin","super_admin"]),
  validate(createNilaiValidator),
  createNilai
)

router.put(
  "/update/:id",
  auth,
  role(["guru","admin","super_admin"]),
  validate([...idValidator, ...updateNilaiValidator]),
  updateNilai
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deleteNilai
)

module.exports = router