const roleMiddleware = (roles = []) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized (belum login)"
      })
    }

    
    const allowedRoles = Array.isArray(roles) ? roles : [roles]

    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Akses ditolak"
      })
    }

    next()
  }
}

module.exports = roleMiddleware