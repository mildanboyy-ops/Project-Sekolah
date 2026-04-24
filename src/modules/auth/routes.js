const express = require("express")
const router = express.Router()

const {
  loginSuperAdminController,
  loginAdminController,
  loginGuruController,
  loginSiswaController
} = require("./controller")

router.post("/superadmin", loginSuperAdminController)

router.post("/admin", loginAdminController)

router.post("/guru", loginGuruController)

router.post("/siswa", loginSiswaController)

module.exports = router