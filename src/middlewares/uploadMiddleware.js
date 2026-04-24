const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadPath = "uploads/"

// bikin folder kalau belum ada
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "")

    cb(null, `${Date.now()}-${safeName}`)
  }
})

// filter file
const fileFilter = (req, file, cb) => {
  const allowedMime = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ]

  const ext = path.extname(file.originalname).toLowerCase()
  const allowedExt = [".jpg", ".jpeg", ".png", ".pdf"]

  if (!allowedMime.includes(file.mimetype) || !allowedExt.includes(ext)) {
    return cb(new Error("File harus JPG, PNG, atau PDF"), false)
  }

  cb(null, true)
}

// multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
})

module.exports = upload