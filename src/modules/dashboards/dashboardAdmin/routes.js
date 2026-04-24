const express = require("express")
const router = express.Router()

const { dashboardAdmin } = require("./controller")

const { auth } = require("../../../middlewares/authMiddleware")
const role = require("../../../middlewares/roleMiddleware")

router.get(
  "/dashboard",
  auth,
  role(["admin", "super_admin"]),
  dashboardAdmin
)

module.exports = router