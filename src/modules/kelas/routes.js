const express = require("express")
const router = express.Router()

const {
  getAllKelas,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createKelasValidator,
  updateKelasValidator
} = require("../../middlewares/kelasMiddleware")

const { param } = require("express-validator")

const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin","guru"]),
  getAllKelas
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru"]),
  validate(idValidator),
  getKelasById
)

router.post(
  "/create",
  auth,
  role(["admin","super_admin"]),
  validate(createKelasValidator),
  createKelas
)

router.put(
  "/update/:id",
  auth,
  role(["admin","super_admin"]),
  validate([...idValidator, ...updateKelasValidator]),
  updateKelas
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deleteKelas
)

module.exports = router