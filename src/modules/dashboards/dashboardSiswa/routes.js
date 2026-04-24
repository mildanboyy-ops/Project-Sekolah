const express = require("express")
const router = express.Router()

const { dashboardSiswa } = require("./controller")

const { auth } = require("../../../middlewares/authMiddleware")
const role = require("../../../middlewares/roleMiddleware")

router.get(
  "/dashboard",
  auth,
  role(["siswa"]),
  dashboardSiswa
)

module.exports = router