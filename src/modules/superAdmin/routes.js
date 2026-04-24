const router = require("express").Router()

const {
  login,
  getAllSuperAdmin,
  getSuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const { param } = require("express-validator")

// 🔥 validator id
const idValidator = [
  param("id").isUUID().withMessage("ID harus UUID")
]

// ===================== AUTH =====================
router.post("/login", login)

// ===================== SUPER ADMIN CRUD =====================

router.get(
  "/",
  auth,
  role(["super_admin"]),
  getAllSuperAdmin
)

router.get(
  "/search/:id",
  auth,
  role(["super_admin"]),
  validate(idValidator),
  getSuperAdminById
)

router.post(
  "/create",
  auth,
  role(["super_admin"]),
  createSuperAdmin
)

router.put(
  "/update/:id",
  auth,
  role(["super_admin"]),
  validate(idValidator),
  updateSuperAdmin
)

router.delete(
  "/delete/:id",
  auth,
  role(["super_admin"]),
  validate(idValidator),
  deleteSuperAdmin
)

module.exports = router