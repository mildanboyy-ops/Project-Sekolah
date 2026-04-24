const router = require("express").Router()

const {
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
} = require("./controller")

const { auth } = require("../../middlewares/authMiddleware")
const role = require("../../middlewares/roleMiddleware")
const validate = require("../../middlewares/validator")

const {
  createAdminValidator,
  updateAdminValidator
} = require("../../middlewares/adminMiddleware")

router.get("/", auth, role(["super_admin","admin"]), getAllAdmin)

router.get("/search/:id", auth, role(["super_admin","admin"]), getAdminById)

router.post(
  "/create",
  auth,
  role(["super_admin"]),
  validate(createAdminValidator),
  createAdmin
)

router.put(
  "/update/:id",
  auth,
  role(["super_admin","admin"]),
  validate(updateAdminValidator),
  updateAdmin
)

router.delete(
  "/delete/:id",
  auth,
  role(["super_admin"]),
  deleteAdmin
)

module.exports = router