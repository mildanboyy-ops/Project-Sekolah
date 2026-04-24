const express = require("express")
const router = express.Router()

const {
  getAllMapel,
  getMapelById,
  createMapel,
  updateMapel,
  deleteMapel
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createMapelValidator,
  updateMapelValidator
} = require("../../middlewares/mapelMiddleware")

const { param } = require("express-validator")

const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin","guru","siswa"]),
  getAllMapel
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru","siswa"]),
  validate(idValidator),
  getMapelById
)

router.post(
  "/create",
  auth,
  role(["admin","super_admin"]),
  validate(createMapelValidator),
  createMapel
)

router.put(
  "/update/:id",
  auth,
  role(["admin","super_admin"]),
  validate([...idValidator, ...updateMapelValidator]),
  updateMapel
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deleteMapel
)

module.exports = router