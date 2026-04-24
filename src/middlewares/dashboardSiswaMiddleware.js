const dashboardSiswaMiddleware = (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    if (user.role !== "siswa") {
      return res.status(403).json({
        message: "Akses hanya untuk siswa"
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    })
  }
}

module.exports = dashboardSiswaMiddleware