const dashboardAdminMiddleware = (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    const allowedRoles = ["admin", "super_admin"]

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Akses hanya untuk admin"
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    })
  }
}

module.exports = dashboardAdminMiddleware