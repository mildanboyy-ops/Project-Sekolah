const success = (res, message, data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data
  })
}

const error = (res, message, code = 500) => {
  return res.status(code).json({
    success: false,
    message
  })
}

module.exports = {
  success,
  error
}