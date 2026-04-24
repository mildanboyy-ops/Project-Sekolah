const { validationResult } = require("express-validator")

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)))

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation error",
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      })
    }

    next()
  }
}

module.exports = validate