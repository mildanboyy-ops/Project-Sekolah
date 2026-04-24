const express = require("express")
const router = express.Router()

const {
    getAllAbsensi,
    getAbsensiById,
    createAbsensi,
    updateAbsensi,
    deleteAbsensi
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createAbsensiValidator,
  updateAbsensiValidator
} = require("../../middlewares/absensiMiddleware")

router.get("/", getAllAbsensi)

router.get("/search/:id", auth, role(["admin", "guru"]), getAbsensiById)

router.post(
  "/create",
  auth,
  role(["guru"]),
  validate(createAbsensiValidator),
  createAbsensi
)

router.put(
  "/update/:id",
  auth,
  role(["guru"]),
  validate(updateAbsensiValidator),
  updateAbsensi
)

router.delete(
  "/delete/:id",
  auth,
  role(["admin"]),
  deleteAbsensi
)

module.exports = router