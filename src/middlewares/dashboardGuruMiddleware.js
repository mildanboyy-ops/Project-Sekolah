const dashboardGuruMiddleware = (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }

    if (user.role !== "guru") {
      return res.status(403).json({
        message: "Akses hanya untuk guru"
      })
    }

    next()
  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    })
  }
}

module.exports = dashboardGuruMiddleware