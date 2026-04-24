const router = require("express").Router()

const {
  getAllGuru,
  getGuruById,
  createGuru,
  updateGuru,
  deleteGuru
} = require("./controller.js")

const { auth } = require("../../middlewares/authMiddleware.js")
const role = require("../../middlewares/roleMiddleware.js")
const validate = require("../../middlewares/validator")

const {
  createGuruValidator,
  updateGuruValidator
} = require("../../middlewares/guruMiddleware")

const { param } = require("express-validator")

const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

router.get(
  "/",
  auth,
  role(["admin","super_admin"]),
  getAllGuru
)

router.get(
  "/search/:id",
  auth,
  role(["admin","super_admin","guru"]),
  validate(idValidator),
  getGuruById
)

router.post(
  "/create",
  auth,
  role(["admin","super_admin"]),
  validate(createGuruValidator),
  createGuru
)

router.put(
  "/update/:id",
  auth,
  role(["admin","super_admin"]),
  validate([...idValidator, ...updateGuruValidator]),
  updateGuru
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin","super_admin"]),
  validate(idValidator),
  deleteGuru
)

module.exports = router