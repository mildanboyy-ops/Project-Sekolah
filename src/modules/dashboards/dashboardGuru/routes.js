const express = require("express")
const router = express.Router()

const { dashboardGuru } = require("./controller")

const { auth } = require("../../../middlewares/authMiddleware")
const role = require("../../../middlewares/roleMiddleware")

router.get(
  "/dashboard",
  auth,
  role(["guru"]),
  dashboardGuru
)

module.exports = router